import { Component } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListFoodDTO } from '../../interfaces/FoodDTO';
import { DatabaseService } from '../../services/database.service';
import { PrivateService } from 'src/app/core/services/private.service';

@Component({
  selector: 'app-list-foods',
  templateUrl: './list-foods.component.html',
  styleUrls: ['./list-foods.component.scss'],
})
export class ListFoodsComponent {
  public data: ListFoodDTO = { foods: [] };
  public hasRequiredRole!: boolean;

  constructor(
    private globalService: GlobalService,
    private databaseService: DatabaseService
  ) {}

  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.globalService.setTitle('Base de Datos');
    });
    this.hasRequiredRole = this.databaseService.hasRequiredRoleToSeeFavorites();
    this.databaseService.refreshNeeded$.subscribe(() => {
      this.getFoods();
    });
  }

  getFoods(): void {
    this.databaseService.getFoods().subscribe((data) => {
      this.data = data;
    });
  }
}
