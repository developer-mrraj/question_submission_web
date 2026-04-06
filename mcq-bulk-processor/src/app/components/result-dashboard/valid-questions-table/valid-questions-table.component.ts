import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ParsedFlatQuestion } from '../../../models/question.model';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-valid-questions-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatTooltipModule, ScrollingModule],
  templateUrl: './valid-questions-table.component.html'
})
export class ValidQuestionsTableComponent implements OnChanges {
  @Input() questions: ParsedFlatQuestion[] = [];
  
  displayedColumns: string[] = ['index', 'text', 'difficulty', 'module', 'option1', 'option2', 'option3', 'option4'];
  dataSource = new MatTableDataSource<ParsedFlatQuestion>([]);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['questions'] && this.questions) {
      this.dataSource.data = this.questions;
    }
  }

  truncate(str: string, n: number) {
    return (str.length > n) ? str.slice(0, n-1) + '&hellip;' : str;
  }
}
