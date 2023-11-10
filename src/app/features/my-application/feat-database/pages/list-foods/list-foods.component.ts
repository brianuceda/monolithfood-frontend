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

  filterFoods(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
  
    // Filtrar alimentos basados en el término de búsqueda
    this.filteredFoods = this.data.foods.filter((food) =>
      food.foodName.toLowerCase().startsWith(searchTerm)
    );
  
    // Ordenar alimentos alfabéticamente
    this.filteredFoods.sort((a, b) => {
      const nameA = a.foodName.toLowerCase();
      const nameB = b.foodName.toLowerCase();
  
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }
}
