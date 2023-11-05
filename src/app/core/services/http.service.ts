import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ResponseType } from '../interfaces/ResponseType';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  getSimple<T>(url: string, params?: any): Observable<T> {
    return this.http
      .get<T>(url, { params: params || {} })
      .pipe(catchError(this.handleError<T>()));
  }

  postSimple<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body).pipe(catchError(this.handleError<T>()));
  }

  putSimple<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body).pipe(catchError(this.handleError<T>()));
  }

  deleteSimple<T>(url: string, id: number): Observable<T> {
    return this.http
      .delete<T>(url, { params: { id: id.toString() } })
      .pipe(catchError(this.handleError<T>()));
  }

  private handleError<T>() {
    return (error: any): Observable<T> => {
      let errorMessage = 'Ocurrio un error desconocido';
      let type = ResponseType.ERROR;
      if (error.status === 0) {
        errorMessage = 'No se pudo conectar con el servidor';
      } else if (error?.error?.message) {
        errorMessage = error.error.message;
        type = error.error.type;
      }
      this.globalService.openCustomSnackbar(errorMessage, type);
      return of();
    };
  }
}
