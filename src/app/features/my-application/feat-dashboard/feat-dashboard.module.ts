import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Material
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
// Actual Feature
import { FeatDashboardRoutingModule } from './feat-dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// Other Features
import { FeatOnboardingModule } from 'src/app/features/my-application/feat-onboarding/feat-onboarding.module';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { AddEditIntakeComponent } from './components/add-edit-intake/add-edit-intake.component';

@NgModule({
  declarations: [DashboardComponent, AddEditIntakeComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FeatDashboardRoutingModule,
    FeatOnboardingModule,
    SharedComponentsModule,
  ],
})
export class FeatDashboardModule {}
