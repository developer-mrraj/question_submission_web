import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParsedFlatQuestion } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/** Legacy export-section component – no longer rendered in the new 3-step flow. */
@Component({
  selector: 'app-export-section',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './export-section.component.html'
})
export class ExportSectionComponent {
  @Input() questions: ParsedFlatQuestion[] = [];
  isExporting = false;

  constructor(private questionService: QuestionService) {}

  onExport() {
    this.questionService.exportToExcel();
  }
}
