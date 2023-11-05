import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment.prod';
import { ListFoodDTO } from '../interfaces/FoodDTO';
import { PrivateService } from 'src/app/core/services/private.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  // * APIs
  private apiFoodsUrl = `${environment.api}${environment.rscFoods}`;
  private apiFavoritesUrl = `${environment.api}${environment.rscFavorites}`;
  // * Roles required to see favorites
  private rolesRequiredToSeeFavorites: string[] = ['ROLE_ADMIN', 'ROLE_VIP'];
  // * Refresh data
  private refreshNeededSubject = new BehaviorSubject<void>(undefined);
  public refreshNeeded$ = this.refreshNeededSubject.asObservable();

  constructor(
    private httoService: HttpService,
    private privateService: PrivateService
  ) {}

  public getFoods(): Observable<ListFoodDTO> {
    return this.httoService.getSimple(this.apiFoodsUrl);
  }

  hasRequiredRoleToSeeFavorites(): boolean {
    return this.privateService.hasRequiredRoles(
      this.rolesRequiredToSeeFavorites
    );
  }

  public getFavorites(): Observable<ListFoodDTO> {
    return this.httoService.getSimple(this.apiFavoritesUrl);
  }

  public addToFavorites(id: number): Observable<any> {
    const api = this.apiFavoritesUrl + '/add';
    return this.httoService.postSimple(api, { id }).pipe(
      tap(() => {
        this.refreshNeededSubject.next();
      })
    );
  }

  public removeFromFavorites(id: number): Observable<any> {
    const api = this.apiFavoritesUrl + '/delete';
    return this.httoService.deleteSimple(api, { id }).pipe(
      tap(() => {
        this.refreshNeededSubject.next();
      })
    );
  }
}
