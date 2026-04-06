import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParseRequest } from '../../models/question.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-input-panel',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './input-panel.component.html'
})
export class InputPanelComponent {
  @Input() isLoading = false;
  @Input() errorMsg: string | null = null;
  @Output() process = new EventEmitter<ParseRequest>();

  inputForm: FormGroup;

  classes = ['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10'];

  constructor(private fb: FormBuilder) {
    this.inputForm = this.fb.group({
      rawText: ['', [Validators.required, Validators.minLength(10)]],
      classLevel: ['', Validators.required],
      subject: ['', Validators.required],
      difficulty: ['', Validators.required]
    });
  }

  get rawTextControl() {
    return this.inputForm.get('rawText');
  }

  get charCount() {
    return this.rawTextControl?.value?.length || 0;
  }

  onSubmit() {
    if (this.inputForm.valid) {
      this.process.emit(this.inputForm.value);
    } else {
      this.inputForm.markAllAsTouched();
    }
  }
}
