import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLevelsComponent } from './activity-levels.component';

describe('ActivityLevelsComponent', () => {
  let component: ActivityLevelsComponent;
  let fixture: ComponentFixture<ActivityLevelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityLevelsComponent]
    });
    fixture = TestBed.createComponent(ActivityLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
