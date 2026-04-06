import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidQuestionsTable } from './valid-questions-table';

describe('ValidQuestionsTable', () => {
  let component: ValidQuestionsTable;
  let fixture: ComponentFixture<ValidQuestionsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidQuestionsTable],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidQuestionsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
