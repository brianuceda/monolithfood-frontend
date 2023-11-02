import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { MacrosDetailedDTO } from '../interfaces/MacrosDetailedDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = `${environment.api}${environment.rscIntakes}`;

  constructor(private httpService: HttpService) {}

  public getMacrosDetailed(
    dateControl: FormControl
  ): Observable<MacrosDetailedDTO> {
    const api = this.apiUrl + '/macros';
    const params = this.startAndEndDate(dateControl);
    return this.httpService.getSimple<MacrosDetailedDTO>(api, params);
  }

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
}
