import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  catchError,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AllMacrosAndIntakesDTO } from '../interfaces/MacrosDetailedDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/app/core/services/http.service';
import { MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = `${environment.api}${environment.rscIntakes}`;

  private refreshNeededSubject = new BehaviorSubject<void>(undefined);
  public refreshNeeded$ = this.refreshNeededSubject.asObservable();

  constructor(private httpService: HttpService) {}

  // public getMacrosDetailed(
  //   dateControl: FormControl
  // ): Observable<MacrosDetailedDTO> {
  //   const api = this.apiUrl + '/macros';
  //   const params = this.startAndEndDate(dateControl);
  //   return this.httpService.getSimple<MacrosDetailedDTO>(api, params);
  // }

  public getMacrosDetailed(
    dateControl: FormControl
  ): Observable<AllMacrosAndIntakesDTO | null> {
    const api = this.apiUrl + '/category/all';
    const params = this.startAndEndDate(dateControl);
    return this.httpService.getSimple<AllMacrosAndIntakesDTO>(api, params).pipe(
      catchError((error) => {
        console.error('Error fetching macros detailed:', error);
        return of(null);
      })
    );
  }

  public deleteIntake(intakeId: number): Observable<any> {
    const api = this.apiUrl + '/delete';
    return this.httpService.deleteSimple<any>(api, intakeId).pipe(
      tap(() => {
        this.refreshNeededSubject.next();
      })
    );
  }

  // * Functions
  public startAndEndDate(
    dateControl: FormControl
  ): { startDate: string; endDate: string } | null {
    const dateValue = dateControl.value;
    if (!dateValue) return null;
    // Crear objeto Date
    const dateObj = new Date(dateValue);
    // Restar 5 horas para nivelar la fecha de Perú a UTC
    dateObj.setTime(dateObj.getTime() - 5 * 60 * 60 * 1000);
    // Convertir a Formato: YYYY-MM-DDT
    const date = dateObj.toISOString().slice(0, 11);
    // Obtener fecha de inicio y fecha de fin
    const startDate = date + '00:00:00';
    const endDate = date + '23:59:59.999';
    return {
      startDate: startDate,
      endDate: endDate,
    };
  }
  public getDialogConfig(
    width: string,
    height: string,
    disableClose: boolean,
    closeOnNavigation: boolean,
    data: any = null
  ): MatDialogConfig {
    const config = new MatDialogConfig();
    config.disableClose = disableClose || false;
    config.autoFocus = true;
    config.hasBackdrop = true;
    config.closeOnNavigation = closeOnNavigation || false;
    config.width = width || '1080px';
    config.height = height || '650px';
    config.enterAnimationDuration = 700;
    config.exitAnimationDuration = 700;
    config.backdropClass = 'style-css-dialog-background';
    config.data = data || null;
    return config;
  }
}
