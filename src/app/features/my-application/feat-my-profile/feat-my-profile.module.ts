import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatMyProfileRoutingModule } from './feat-my-profile-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ActivityLevelsComponent } from './components/activity-levels/activity-levels.component';
import { ObjectivesComponent } from './components/objectives/objectives.component';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    MyProfileComponent,
    ActivityLevelsComponent,
    ObjectivesComponent,
  ],
  imports: [CommonModule, FeatMyProfileRoutingModule, MatButtonModule, AngularMaterialModule,MatSlideToggleModule],
})
export class FeatMyProfileModule {}
