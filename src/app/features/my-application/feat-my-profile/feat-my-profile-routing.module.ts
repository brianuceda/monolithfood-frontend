import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ListObjectivesComponent } from './pages/list-objectives/list-objectives.component';
import { ListActivityLevelsComponent } from './pages/list-activity-levels/list-activity-levels.component';

const routes: Routes = [
  { path: '', component: MyProfileComponent },
  { path: 'objectives', component: ListObjectivesComponent },
  { path: 'activity-levels', component: ListActivityLevelsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatMyProfileRoutingModule {}
