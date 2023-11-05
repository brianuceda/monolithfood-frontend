import { DatabaseComponent } from './components/database/database.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatDatabaseRoutingModule } from './feat-database-routing.module';
import { FoodComponent } from './components/food/food.component';
import { FavouritesComponent } from './components/favourites/favourites.component';

@NgModule({
  declarations: [DatabaseComponent, FoodComponent, FavouritesComponent],
  imports: [CommonModule, FeatDatabaseRoutingModule],
})
export class FeatDatabaseModule {}
