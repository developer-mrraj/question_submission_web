import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParsedFlatQuestion } from '../../models/question.model';
import { SummaryCardsComponent } from './summary-cards/summary-cards.component';
import { ValidQuestionsTableComponent } from './valid-questions-table/valid-questions-table.component';
import { ErrorPanelComponent } from './error-panel/error-panel.component';

/** Legacy component kept for compilation. Not actively rendered in the new 3-step flow. */
export interface LegacyParseResponse {
  summary: { total: number; valid: number; errors: number };
  validQuestions: ParsedFlatQuestion[];
  errors: { questionNumber: number; reason: string }[];
}

@Component({
  selector: 'app-result-dashboard',
  standalone: true,
  imports: [CommonModule, SummaryCardsComponent, ValidQuestionsTableComponent, ErrorPanelComponent],
  templateUrl: './result-dashboard.component.html'
})
export class ResultDashboardComponent {
  @Input() response!: LegacyParseResponse;
}
