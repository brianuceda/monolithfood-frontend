import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultReportsComponent } from './default-reports.component';

describe('DefaultReportsComponent', () => {
  let component: DefaultReportsComponent;
  let fixture: ComponentFixture<DefaultReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultReportsComponent]
    });
    fixture = TestBed.createComponent(DefaultReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
