import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityLevelComponent } from './components/activity-level/activity-level.component';
import { ObjectiveComponent } from './components/objective/objective.component';

@NgModule({
  declarations: [ActivityLevelComponent, ObjectiveComponent],
  imports: [CommonModule],
  exports: [ActivityLevelComponent, ObjectiveComponent],
})
export class SharedMyProfileComponentsModule {}
