import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, of } from 'rxjs';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ResponseType } from '../interfaces/ResponseType';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  getSimple<T>(url: string, params?: any): Observable<T> {
    return this.http.get<T>(url, { params: params || {} }).pipe(
      catchError((e) => {
        let errorMessage = 'Ocurrio un error desconocido';
        let type = ResponseType.ERROR;
        if (e.status === 0) {
          errorMessage = 'No se pudo conectar con el servidor';
          type = ResponseType.ERROR;
        } else if (e && e.error && e.error.message) {
          errorMessage = e.error.message;
          type = e.error.type;
        }
        this.globalService.openCustomSnackbar(errorMessage, type);
        return of();
      })
    );
  }
}
