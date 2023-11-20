import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/features/my-application/feat-my-profile/components/objective/objective.component.spec.ts
import { ObjectiveComponent } from './objective.component';

describe('ObjectiveComponent', () => {
  let component: ObjectiveComponent;
  let fixture: ComponentFixture<ObjectiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectiveComponent]
    });
    fixture = TestBed.createComponent(ObjectiveComponent);
========
import { IntakeComponent } from './intake.component';

describe('IntakeComponent', () => {
  let component: IntakeComponent;
  let fixture: ComponentFixture<IntakeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntakeComponent]
    });
    fixture = TestBed.createComponent(IntakeComponent);
>>>>>>>> c8e286fdcf522ca3eaff56d49b2d2a1e017e52ae:src/app/features/my-application/feat-dashboard/components/intake/intake.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
