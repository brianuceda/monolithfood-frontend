import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Material
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
// Actual Feature
import { FeatDashboardRoutingModule } from './feat-dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// Other Features
import { FeatOnboardingModule } from 'src/app/features/my-application/feat-onboarding/feat-onboarding.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FeatDashboardRoutingModule,
    FeatOnboardingModule,
  ],
})
export class FeatDashboardModule {}
