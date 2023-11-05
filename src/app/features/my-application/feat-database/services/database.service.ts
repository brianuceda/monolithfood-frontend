import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment.prod';
import { ListFoodDTO } from '../interfaces/FoodDTO';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private apiUrl = `${environment.api}${environment.rscFoods}`;

  constructor(private httoService: HttpService) {}

  public getFoods(): Observable<ListFoodDTO> {
    return this.httoService.getSimple(this.apiUrl);
  }
}
