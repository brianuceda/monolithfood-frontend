import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatMyProfileRoutingModule } from './feat-my-profile-routing.module';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ListActivityLevelsComponent } from './pages/list-activity-levels/list-activity-levels.component';
import { ListObjectivesComponent } from './pages/list-objectives/list-objectives.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { SharedMyProfileComponentsModule } from './shared-my-profile-components.module';

@NgModule({
  declarations: [
    // Pages
    MyProfileComponent,
    ListActivityLevelsComponent,
    ListObjectivesComponent,
  ],
  imports: [
    CommonModule,
    FeatMyProfileRoutingModule,
    AngularMaterialModule,
    SharedComponentsModule,
    SharedMyProfileComponentsModule,
  ],
})
export class FeatMyProfileModule {}
