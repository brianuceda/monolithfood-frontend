import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectObjectivesComponent } from './select-objectives.component';

describe('SelectObjectivesComponent', () => {
  let component: SelectObjectivesComponent;
  let fixture: ComponentFixture<SelectObjectivesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectObjectivesComponent]
    });
    fixture = TestBed.createComponent(SelectObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
