import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetInformationComponent } from './components/set-information/set-information.component';
import { SelectActivityLevelComponent } from './components/select-activity-level/select-activity-level.component';
import { SelectObjectivesComponent } from './components/select-objectives/select-objectives.component';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { SharedMyProfileComponentsModule } from '../feat-my-profile/shared-my-profile-components.module';

@NgModule({
  declarations: [
    SetInformationComponent,
    SelectActivityLevelComponent,
    SelectObjectivesComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedComponentsModule,
    SharedMyProfileComponentsModule,
  ],
  exports: [
    SetInformationComponent,
    SelectActivityLevelComponent,
    SelectObjectivesComponent,
  ],
})
export class FeatOnboardingModule {}
