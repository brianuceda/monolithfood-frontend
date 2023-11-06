import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetInformationComponent } from './components/set-information/set-information.component';
import { SelectActivityLevelComponent } from './components/select-activity-level/select-activity-level.component';
import { SelectObjectivesComponent } from './components/select-objectives/select-objectives.component';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';

@NgModule({
  declarations: [
    SetInformationComponent,
    SelectActivityLevelComponent,
    SelectObjectivesComponent,
  ],
  imports: [CommonModule, AngularMaterialModule],
  exports: [
    SetInformationComponent,
    SelectActivityLevelComponent,
    SelectObjectivesComponent,
  ],
})
export class FeatOnboardingModule {}
