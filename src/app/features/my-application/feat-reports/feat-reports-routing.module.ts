import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultReportsComponent } from './components/default-reports/default-reports.component';
import { FitnessReportsComponent } from './components/fitness-reports/fitness-reports.component';

const routes: Routes = [
    { path: '', component: DefaultReportsComponent },
    { path: 'fitness', component: FitnessReportsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeatReportsRoutingModule { }
