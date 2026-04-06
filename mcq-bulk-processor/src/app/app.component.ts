import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionService } from './services/question.service';
import { ParsedQuestion, ParsedFlatQuestion, ParseRequest } from './models/question.model';

// Child components
import { Step1ConvertComponent } from './components/step1-convert/step1-convert.component';
import { Step2PreviewComponent } from './components/step2-preview/step2-preview.component';
import { Step3ExportComponent } from './components/step3-export/step3-export.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Step1ConvertComponent, Step2PreviewComponent, Step3ExportComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  /** Current step in the wizard */
  currentStep: 1 | 2 | 3 = 1;

  /** Loading / error state */
  isLoading = false;
  errorMsg: string | null = null;

  /** Data from step 1 */
  rawText = '';
  classLevel = '';

  /** Data from /convert (shown in step 2 preview) */
  convertedQuestions: ParsedQuestion[] = [];

  /** Metadata collected in step 2 (sent to /parse) */
  difficulty = '';
  subject = '';

  /** Final flattened data from /parse (shown in step 3) */
  flatQuestions: ParsedFlatQuestion[] = [];

  constructor(private svc: QuestionService) {}

  // ── STEP 1 ──────────────────────────────────────────────
  onConvert(payload: { rawText: string; classLevel: string }) {
    this.rawText = payload.rawText;
    this.classLevel = payload.classLevel;
    this.isLoading = true;
    this.errorMsg = null;
    this.convertedQuestions = [];

    this.svc.convertText(payload.rawText).subscribe({
      next: res => {
        this.convertedQuestions = res;
        this.currentStep = 2;
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = 'Conversion failed. Check your backend is running.';
        this.isLoading = false;
      }
    });
  }

  // ── STEP 2 ──────────────────────────────────────────────
  onParse(payload: { difficulty: string; subject: string }) {
    this.difficulty = payload.difficulty;
    this.subject = payload.subject;
    this.isLoading = true;
    this.errorMsg = null;
    this.flatQuestions = [];

    const request: ParseRequest = {
      difficulty: payload.difficulty,
      module: payload.subject,
      questions: this.convertedQuestions
    };

    this.svc.parseQuestions(request).subscribe({
      next: res => {
        this.flatQuestions = res;
        this.currentStep = 3;
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = 'Parsing failed. Please check backend logs.';
        this.isLoading = false;
      }
    });
  }

  // ── STEP 3 ──────────────────────────────────────────────
  onExport() {
    this.svc.exportToExcel();
  }

  /** Go back to step 1 and reset everything */
  onReset() {
    this.currentStep = 1;
    this.rawText = '';
    this.classLevel = '';
    this.convertedQuestions = [];
    this.flatQuestions = [];
    this.difficulty = '';
    this.subject = '';
    this.errorMsg = null;
  }

  /** Go back from step 3 → step 2 */
  onBackToPreview() {
    this.currentStep = 2;
    this.errorMsg = null;
  }

  /** Go back from step 2 → step 1 */
  onBackToInput() {
    this.currentStep = 1;
    this.errorMsg = null;
  }
}
