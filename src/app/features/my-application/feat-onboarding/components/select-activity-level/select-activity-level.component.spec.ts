import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectActivityLevelComponent } from './select-activity-level.component';

describe('SelectActivityLevelComponent', () => {
  let component: SelectActivityLevelComponent;
  let fixture: ComponentFixture<SelectActivityLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectActivityLevelComponent]
    });
    fixture = TestBed.createComponent(SelectActivityLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
