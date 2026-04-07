import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,
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


  /** Modules shown ONLY for the Decision & Quiz section */
  readonly dqModules = [
    { label: 'Decision Game', value: 'decision_making' },
    { label: 'GK', value: 'GK' },
    { label: 'Grammar', value: 'Grammar' },
    { label: 'AI', value: 'AI' },
  ];

  /** Modules shown ONLY for the Other (MCQ) section */
  readonly mcqModules = [
    { label: 'IMO', value: '1' },
    { label: 'NSO', value: '2' },
    { label: 'IGKO', value: '3' },
    { label: 'NEET', value: '4' },
    { label: 'JEE', value: '5' },
    { label: 'UPSC', value: '6' },
    { label: 'Level Map', value: 'Level_map' },
    { label: 'Practice Test', value: 'Practice_test' },
  ];

  /** Active module list based on current mode */
  get modules() {
    return this.mode === 'dq' ? this.dqModules : this.mcqModules;
  }

  /** Difficulty options: shown as Standard grade, stored as numeric value */
  readonly difficulties = [
    { label: '1st Standard', value: '1' },
    { label: '2nd Standard', value: '1' },
    { label: '3rd Standard', value: '2' },
    { label: '4th Standard', value: '3' },
    { label: '5th Standard', value: '4' },
    { label: '6th Standard', value: '5' },
    { label: '7th Standard', value: '6' },
  ];


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
