import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionService } from './services/question.service';
import { ParsedQuestion, ParsedFlatQuestion, ParsedFlatDQQuestion, ParseRequest, Mode } from './models/question.model';

// Child components
import { HomeComponent } from './components/home/home.component';
import { Step1ConvertComponent } from './components/step1-convert/step1-convert.component';
import { Step2PreviewComponent, ParsePayload } from './components/step2-preview/step2-preview.component';
import { Step3ExportComponent } from './components/step3-export/step3-export.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HomeComponent, Step1ConvertComponent, Step2PreviewComponent, Step3ExportComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  /** Home → mode selection; 'home' shows the landing page */
  mode: 'home' | Mode = 'home';

  /** Current step in the wizard (shared across both flows) */
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

  /** MCQ — final flattened data from /parse */
  flatQuestions: ParsedFlatQuestion[] = [];

  /** DQ — final flattened data from /parse/dq */
  flatDQQuestions: ParsedFlatDQQuestion[] = [];

  constructor(private svc: QuestionService) {}

  // ── HOME ─────────────────────────────────────────────────
  onSelectMode(m: Mode) {
    this.mode = m;
    this._resetWizard();
  }

  // ── STEP 1 ──────────────────────────────────────────────
  onConvert(payload: { rawText: string; classLevel: string }) {
    this.rawText = payload.rawText;
    this.classLevel = payload.classLevel;
    this.isLoading = true;
    this.errorMsg = null;
    this.convertedQuestions = [];

    const obs = this.mode === 'dq'
      ? this.svc.convertDQText(payload.rawText)
      : this.svc.convertText(payload.rawText);

    obs.subscribe({
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
  onParse(payload: ParsePayload) {
    this.difficulty = payload.difficulty;
    this.subject = payload.subject;
    this.isLoading = true;
    this.errorMsg = null;
    this.flatQuestions = [];
    this.flatDQQuestions = [];

    if (this.mode === 'dq') {
      // Pass the edited questions (with title + explanation) straight to the backend
      const request: ParseRequest = {
        difficulty: payload.difficulty,
        module: payload.subject,
        questions: payload.questions
      };
      this.svc.parseDQQuestions(request).subscribe({
        next: res => {
          this.flatDQQuestions = res;
          this.currentStep = 3;
          this.isLoading = false;
        },
        error: () => {
          this.errorMsg = 'Parsing failed. Please check backend logs.';
          this.isLoading = false;
        }
      });
    } else {
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
  }

  // ── STEP 3 ──────────────────────────────────────────────
  onExport() {
    if (this.mode === 'dq') {
      this.svc.exportDQToExcel();
    } else {
      this.svc.exportToExcel();
    }
  }

  /** Reset wizard and return to home screen */
  onReset() {
    this.mode = 'home';
    this._resetWizard();
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

  private _resetWizard() {
    this.currentStep = 1;
    this.rawText = '';
    this.classLevel = '';
    this.convertedQuestions = [];
    this.flatQuestions = [];
    this.flatDQQuestions = [];
    this.difficulty = '';
    this.subject = '';
    this.errorMsg = null;
    this.isLoading = false;
  }
}
