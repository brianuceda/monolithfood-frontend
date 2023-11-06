import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { ListFoodsComponent } from './components/list-foods/list-foods.component';

const routes: Routes = [
  { path: '', component: ListFoodsComponent },
  { path: 'favourites', component: FavouritesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatDatabaseRoutingModule {}
