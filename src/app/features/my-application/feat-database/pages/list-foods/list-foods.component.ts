// list-foods.component.ts
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
  public filteredFoods: any[] = []; // Array para almacenar alimentos filtrados
  public filterCriteria: string = 'foodName';

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
      // Al actualizar los alimentos, también actualiza los alimentos filtrados
      this.filteredFoods = this.data.foods;
    });
  }

  changeFilterCriteria(criteria: string): void {
    this.filterCriteria = criteria;
  }

  filterFoods(event: any): void {
    const searchTerm = event.target.value.toLowerCase();

    // Decide si filtrar por nombre o categoría basado en el criterio de filtrado actual
    if (this.filterCriteria === 'foodName') {
      this.filteredFoods = this.data.foods.filter((food) =>
        food.foodName.toLowerCase().startsWith(searchTerm)
      );
    } else if (this.filterCriteria === 'foodCategory') {
      this.filteredFoods = this.data.foods.filter((food) =>
        food.foodCategory.toLowerCase().startsWith(searchTerm)
      );
    }

    // Ordenar alimentos alfabéticamente por el criterio de filtrado
    this.filteredFoods.sort((a, b) => {
      const valueA =
        this.filterCriteria === 'foodName'
          ? a.foodName.toLowerCase()
          : a.foodCategory.toLowerCase();
      const valueB =
        this.filterCriteria === 'foodName'
          ? b.foodName.toLowerCase()
          : b.foodCategory.toLowerCase();

      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
      return 0;
    });
  }
}
