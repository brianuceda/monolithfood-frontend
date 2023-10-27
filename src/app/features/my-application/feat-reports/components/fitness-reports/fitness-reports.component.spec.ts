import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessReportsComponent } from './fitness-reports.component';

describe('FitnessReportsComponent', () => {
  let component: FitnessReportsComponent;
  let fixture: ComponentFixture<FitnessReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FitnessReportsComponent]
    });
    fixture = TestBed.createComponent(FitnessReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
