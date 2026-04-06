import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ParsedQuestion, Mode } from '../../models/question.model';

export interface ParsePayload {
  difficulty: string;
  subject: string;
  /** Carries title/explanation edits for DQ mode; same array for MCQ (fields ignored) */
  questions: ParsedQuestion[];
}

@Component({
  selector: 'app-step2-preview',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatTooltipModule, MatProgressSpinnerModule
  ],
  templateUrl: './step2-preview.component.html'
})
export class Step2PreviewComponent implements OnChanges {
  @Input() questions: ParsedQuestion[] = [];
  @Input() isLoading = false;
  @Input() mode: Mode = 'mcq';

  /** Mutable local copy so title/explanation edits are tracked */
  localQuestions: ParsedQuestion[] = [];

  @Output() parse = new EventEmitter<ParsePayload>();
  @Output() back = new EventEmitter<void>();

  metaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.metaForm = this.fb.group({
      subject: ['', Validators.required],
      difficulty: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['questions']) {
      // Deep-copy so parent array is not mutated
      this.localQuestions = this.questions.map(q => ({ ...q }));
    }
  }

  onSubmit() {
    if (this.metaForm.valid) {
      this.parse.emit({
        ...this.metaForm.value,
        questions: this.localQuestions
      });
    } else {
      this.metaForm.markAllAsTouched();
    }
  }

  getOptionKeys(options: { [k: string]: string }): string[] {
    return Object.keys(options);
  }
}
