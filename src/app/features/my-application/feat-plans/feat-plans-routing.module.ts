import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPlansComponent } from './pages/list-plans/list-plans.component';

const routes: Routes = [{ path: '', component: ListPlansComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatPlansRoutingModule {}
