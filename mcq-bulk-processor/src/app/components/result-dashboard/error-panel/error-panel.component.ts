import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-panel.component.html'
})
export class ErrorPanelComponent {
  @Input() errors: { questionNumber: number; reason: string }[] = [];

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
