import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatReportsRoutingModule } from './feat-reports-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FitnessReportsComponent } from './components/fitness-reports/fitness-reports.component';
//progress bar import 
import { ProgressBarModule } from 'primeng/progressbar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';

///import echart for graphig
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [FitnessReportsComponent],
  imports: [
    CommonModule, 
    FeatReportsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    ProgressBarModule,
    ToastModule,
    //import echart for graphig
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), 
    }),
  ],
})
export class FeatReportsModule { }
