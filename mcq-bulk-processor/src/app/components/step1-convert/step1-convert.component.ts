import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-step1-convert',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatSelectModule, MatInputModule,
    MatButtonModule, MatProgressSpinnerModule
  ],
  templateUrl: './step1-convert.component.html'
})
export class Step1ConvertComponent {
  @Input() isLoading = false;
  @Output() convert = new EventEmitter<{ rawText: string; classLevel: string }>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      rawText: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get charCount() { return this.form.get('rawText')?.value?.length || 0; }

  onSubmit() {
    if (this.form.valid) {
      this.convert.emit({ rawText: this.form.value.rawText, classLevel: '' });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
