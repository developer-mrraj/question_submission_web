import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPanel } from './error-panel';

describe('ErrorPanel', () => {
  let component: ErrorPanel;
  let fixture: ComponentFixture<ErrorPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
