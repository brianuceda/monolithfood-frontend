import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatabaseComponent } from './components/database/database.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
    { path: '', component: DatabaseComponent },
    { path: 'favorites', component: FavoritesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeatDatabaseRoutingModule { }
