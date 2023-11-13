import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLevelComponent } from './activity-level.component';

describe('ActivityLevelComponent', () => {
  let component: ActivityLevelComponent;
  let fixture: ComponentFixture<ActivityLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityLevelComponent]
    });
    fixture = TestBed.createComponent(ActivityLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
