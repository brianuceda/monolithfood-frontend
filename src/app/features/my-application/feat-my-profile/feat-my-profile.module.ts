import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatMyProfileRoutingModule } from './feat-my-profile-routing.module';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ActivityLevelsComponent } from './components/activity-levels/activity-levels.component';
import { ObjectivesComponent } from './components/objectives/objectives.component';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';

@NgModule({
  declarations: [
    MyProfileComponent,
    ActivityLevelsComponent,
    ObjectivesComponent,
  ],
  imports: [
    CommonModule,
    FeatMyProfileRoutingModule,
    AngularMaterialModule,
    SharedComponentsModule,
  ],
})
export class FeatMyProfileModule {}
