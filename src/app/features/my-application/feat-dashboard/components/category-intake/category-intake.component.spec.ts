import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryIntakeComponent } from './category-intake.component';

describe('CategoryIntakeComponent', () => {
  let component: CategoryIntakeComponent;
  let fixture: ComponentFixture<CategoryIntakeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryIntakeComponent]
    });
    fixture = TestBed.createComponent(CategoryIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
