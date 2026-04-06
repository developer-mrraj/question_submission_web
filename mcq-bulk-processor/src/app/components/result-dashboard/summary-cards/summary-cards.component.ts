import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-cards.component.html'
})
export class SummaryCardsComponent implements OnChanges {
  @Input() summary!: { total: number; valid: number; errors: number };

  displayTotal = 0;
  displayValid = 0;
  displayErrors = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['summary'] && this.summary) {
      this.animateCounters('displayTotal', this.summary.total);
      this.animateCounters('displayValid', this.summary.valid);
      this.animateCounters('displayErrors', this.summary.errors);
    }
  }

  animateCounters(prop: 'displayTotal' | 'displayValid' | 'displayErrors', target: number) {
    this[prop] = 0;
    const increment = Math.ceil(target / 30) || 1;
    const interval = setInterval(() => {
      if (this[prop] + increment >= target) {
        this[prop] = target;
        clearInterval(interval);
      } else {
        this[prop] += increment;
      }
    }, 20);
  }
}
