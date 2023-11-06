import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatDatabaseRoutingModule } from './feat-database-routing.module';
import { ListFoodsComponent } from './components/list-foods/list-foods.component';

@NgModule({
  declarations: [
    ListFoodsComponent
  ],
  imports: [CommonModule, FeatDatabaseRoutingModule],
})
export class FeatDatabaseModule {}
