import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatDatabaseRoutingModule } from './feat-database-routing.module';
// Pages
import { ListFoodsComponent } from './pages/list-foods/list-foods.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';
// Components
import { FoodComponent } from './components/food/food.component';

@NgModule({
  declarations: [ListFoodsComponent, FavouritesComponent, FoodComponent],
  imports: [CommonModule, FeatDatabaseRoutingModule],
})
export class FeatDatabaseModule {}
