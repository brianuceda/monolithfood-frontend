import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFoodsComponent } from './components/list-foods/list-foods.component';
import { FavouritesComponent } from './components/favourites/favourites.component';

const routes: Routes = [
  { path: '', component: ListFoodsComponent },
  { path: 'favourites', component: FavouritesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatDatabaseRoutingModule {}
