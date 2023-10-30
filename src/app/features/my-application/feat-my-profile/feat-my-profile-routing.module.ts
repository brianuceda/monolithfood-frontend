import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ObjectivesComponent } from './components/objectives/objectives.component';
import { ActivityLevelsComponent } from './components/activity-levels/activity-levels.component';

const routes: Routes = [
  { path: '', component: MyProfileComponent },
  { path: 'objectives', component: ObjectivesComponent },
  { path: 'activity-levels', component: ActivityLevelsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatMyProfileRoutingModule {}
