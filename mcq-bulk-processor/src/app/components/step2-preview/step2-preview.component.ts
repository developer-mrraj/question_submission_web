import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ParsedQuestion } from '../../models/question.model';

@Component({
  selector: 'app-step2-preview',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatTooltipModule, MatProgressSpinnerModule
  ],
  templateUrl: './step2-preview.component.html'
})
export class Step2PreviewComponent {
  @Input() questions: ParsedQuestion[] = [];
  @Input() isLoading = false;
  @Output() parse = new EventEmitter<{ difficulty: string; subject: string }>();
  @Output() back = new EventEmitter<void>();

  metaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.metaForm = this.fb.group({
      subject: ['', Validators.required],
      difficulty: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.metaForm.valid) {
      this.parse.emit(this.metaForm.value);
    } else {
      this.metaForm.markAllAsTouched();
    }
  }

  getOptionKeys(options: { [k: string]: string }): string[] {
    return Object.keys(options);
  }
}
