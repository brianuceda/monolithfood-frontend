import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeatDashboardRoutingModule } from './feat-dashboard-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, FeatDashboardRoutingModule],
})
export class FeatDashboardModule {}
