import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFoodsComponent } from './components/list-foods/list-foods.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { PermissionGuard } from 'src/app/core/guards/permission.guard';

const routes: Routes = [
  { path: '', component: ListFoodsComponent },
  {
    path: 'favourites',
    component: FavouritesComponent,
    canActivate: [PermissionGuard], // Añadir el guard aquí
    data: { roles: ['ROLE_ADMIN', 'ROLE_VIP'] }, // Añadir los roles requeridos aquí
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatDatabaseRoutingModule {}
