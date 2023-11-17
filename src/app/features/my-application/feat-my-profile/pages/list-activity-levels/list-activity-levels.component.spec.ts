import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActivityLevelsComponent } from './list-activity-levels.component';

describe('ListActivityLevelsComponent', () => {
  let component: ListActivityLevelsComponent;
  let fixture: ComponentFixture<ListActivityLevelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListActivityLevelsComponent],
    });
    fixture = TestBed.createComponent(ListActivityLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
