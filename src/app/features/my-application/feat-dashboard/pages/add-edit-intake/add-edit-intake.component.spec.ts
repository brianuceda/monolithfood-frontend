import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditIntakeComponent } from './add-edit-intake.component';

describe('AddEditIntakeComponent', () => {
  let component: AddEditIntakeComponent;
  let fixture: ComponentFixture<AddEditIntakeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditIntakeComponent]
    });
    fixture = TestBed.createComponent(AddEditIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
