import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatabaseComponent } from './components/database/database.component';
import { FavouritesComponent } from './components/favourites/favourites.component';

const routes: Routes = [
  { path: '', component: DatabaseComponent },
  { path: 'favourites', component: FavouritesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatDatabaseRoutingModule {}
