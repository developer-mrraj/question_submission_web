import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ParsedFlatQuestion } from '../../models/question.model';

@Component({
  selector: 'app-step3-export',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTooltipModule],
  templateUrl: './step3-export.component.html'
})
export class Step3ExportComponent {
  @Input() questions: ParsedFlatQuestion[] = [];
  @Output() export = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
}
