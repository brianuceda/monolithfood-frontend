import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListObjectivesComponent } from './list-objectives.component';

describe('ListObjectivesComponent', () => {
  let component: ListObjectivesComponent;
  let fixture: ComponentFixture<ListObjectivesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListObjectivesComponent],
    });
    fixture = TestBed.createComponent(ListObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
