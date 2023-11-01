import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getSimple<T>(url: string, params?: any): Observable<T> {
    return this.http.get<T>(url, { params: params || {} }).pipe(
      catchError((e) => {
        let errorMessage = 'Ocurrio un desconocido.';
        if (e.status === 0) {
          errorMessage = 'No se pudo conectar con el servidor.';
        } else if (e && e.error && e.error.message) {
          errorMessage = e.error.message;
        }
        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 3000,
        });
        return of();
      })
    );
  }
}
