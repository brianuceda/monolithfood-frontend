import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Material
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
// Actual Feature
import { FeatDashboardRoutingModule } from './feat-dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
// Other Features
import { FeatOnboardingModule } from 'src/app/features/my-application/feat-onboarding/feat-onboarding.module';
import { BasicGraphComponent } from './components/basic-graph/basic-graph.component';
// Charts
import { NgApexchartsModule } from 'ng-apexcharts';
import { CategoryIntakeComponent } from './components/category-intake/category-intake.component';
import { IntakeComponent } from './components/intake/intake.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NutritionLabelComponent } from './components/nutrition-label/nutrition-label.component';
import { AddEditIntakeComponent } from './pages/add-edit-intake/add-edit-intake.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AddEditIntakeComponent,
    BasicGraphComponent,
    CategoryIntakeComponent,
    IntakeComponent,
    NutritionLabelComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FeatDashboardRoutingModule,
    FeatOnboardingModule,
    NgApexchartsModule,
    SharedComponentsModule,
  ],
})
export class FeatDashboardModule {}
