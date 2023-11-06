import { Component } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListFoodDTO } from '../../interfaces/FoodDTO';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['../list-foods/list-foods.component.scss'],
})
export class FavouritesComponent {
  public data: ListFoodDTO = { foods: [] };
  public hasRequiredRole!: boolean;

  constructor(
    private globalService: GlobalService,
    private databaseService: DatabaseService
  ) {}

  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.globalService.setTitle('Favoritos');
    });
    this.hasRequiredRole = this.databaseService.hasRequiredRoleToSeeFavorites();
    this.databaseService.refreshNeeded$.subscribe(() => {
      this.getFavorites();
    });
  }

  getFavorites(): void {
    this.databaseService.getFavorites().subscribe((data) => {
      this.data = data;
    });
  }
}
