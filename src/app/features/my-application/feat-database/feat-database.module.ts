import { ListFoodsComponent } from './pages/list-foods/list-foods.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatDatabaseRoutingModule } from './feat-database-routing.module';
import { FoodComponent } from './components/food/food.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';

@NgModule({
  declarations: [ListFoodsComponent, FoodComponent, FavouritesComponent],
  imports: [CommonModule, FeatDatabaseRoutingModule],
})
export class FeatDatabaseModule {}
