import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatMyProfileRoutingModule } from './feat-my-profile-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ListActivityLevelsComponent } from './pages/list-activity-levels/list-activity-levels.component';
import { ListObjectivesComponent } from './pages/list-objectives/list-objectives.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { ActivityLevelComponent } from './components/activity-level/activity-level.component';
import { ObjectiveComponent } from './components/objective/objective.component';

@NgModule({
  declarations: [
    // Pages
    MyProfileComponent,
    ListActivityLevelsComponent,
    ListObjectivesComponent,
    // Components
    ActivityLevelComponent,
    ObjectiveComponent,
  ],
  imports: [
    CommonModule,
    FeatMyProfileRoutingModule,
    MatButtonModule,
    SharedComponentsModule,
  ],
})
export class FeatMyProfileModule {}
