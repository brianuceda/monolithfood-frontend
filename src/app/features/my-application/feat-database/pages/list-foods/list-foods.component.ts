// list-foods.component.ts
import { Component } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListFoodDTO } from '../../interfaces/FoodDTO';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-list-foods',
  templateUrl: './list-foods.component.html',
  styleUrls: ['../foods.component.scss'],
})
export class ListFoodsComponent {
  public hasData: boolean = true;
  public data: ListFoodDTO = { foods: [] };
  public hasRequiredRole!: boolean;
  public originalFoods: any[] = [];
  public filteredFoods: any[] = [];
  public filterCriteria: keyof ListFoodDTO['foods'][number] = 'foodName';
  public showFilterOptions: boolean = false;
  public activeFilter: string | null = null;

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
      this.originalFoods = [...this.data.foods]; // Crea una copia exacta del array
      this.filteredFoods = this.data.foods;
    });
  }

  changeFilterCriteria(criteria: keyof ListFoodDTO['foods'][number]): void {
    this.filterCriteria = criteria;
    this.toggleFilterOptions();
  }

  filterFoods(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    // Filtrar alimentos basados en el término de búsqueda y criterio de filtrado
    this.filteredFoods = this.data.foods.filter((food) => {
      const filterValue = food[this.filterCriteria];
      // Comprobación de tipo antes de llamar a toLowerCase
      if (typeof filterValue === 'string') {
        return filterValue.toLowerCase().startsWith(searchTerm);
      }
      return false;
    });

    // Ordenar alimentos alfabéticamente por el criterio de filtrado
    this.filteredFoods.sort((a, b) => {
      const valueA = a[this.filterCriteria].toLowerCase();
      const valueB = b[this.filterCriteria].toLowerCase();
      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
      return 0;
    });

    // Actualizar hasData basado en si hay alimentos filtrados o no
    this.hasData = this.filteredFoods.length > 0;

    // Si no hay un termino de busqueda, regresa la tabla a su estado original
    if (!searchTerm) {
      this.filteredFoods = [...this.originalFoods];
    }
  }

  toggleFilterOptions(): void {
    this.showFilterOptions = !this.showFilterOptions;
  }
}
