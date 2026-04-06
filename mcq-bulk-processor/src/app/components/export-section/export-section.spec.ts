import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportSection } from './export-section';

describe('ExportSection', () => {
  let component: ExportSection;
  let fixture: ComponentFixture<ExportSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportSection],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
