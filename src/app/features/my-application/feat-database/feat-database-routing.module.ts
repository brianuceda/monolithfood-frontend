import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFoodsComponent } from './pages/list-foods/list-foods.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { PermissionGuard } from 'src/app/core/guards/permission.guard';

const routes: Routes = [
  { path: '', component: ListFoodsComponent },
  {
    path: 'favourites',
    component: FavouritesComponent,
    canActivate: [PermissionGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_VIP'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatDatabaseRoutingModule {}
