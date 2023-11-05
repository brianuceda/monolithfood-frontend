import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ResponseType } from '../interfaces/ResponseType';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  getSimple<T>(url: string, params?: any): Observable<T> {
    return this.handleResponse(this.http.get<T>(url, { params: params || {} }));
  }

  postSimple<T>(url: string, body?: any): Observable<T> {
    return this.handleResponse(this.http.post<T>(url, body));
  }

  putSimple<T>(url: string, body?: any): Observable<T> {
    return this.handleResponse(this.http.put<T>(url, body));
  }

  deleteSimple<T>(url: string, id: number): Observable<T> {
    return this.handleResponse(
      this.http.delete<T>(url, { params: { id: id.toString() } })
    );
  }

  private handleResponse<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(
      tap((response: any) => {
        if (response?.message && response?.type) {
          this.globalService.openCustomSnackbar(
            response.message,
            response.type
          );
        }
      }),
      catchError((error: any): Observable<T> => {
        let errorMessage = 'Ocurrió un error desconocido';
        let type = ResponseType.ERROR;
        if (error.status === 0) {
          errorMessage = 'No se pudo conectar con el servidor';
          type = ResponseType.ERROR;
        } else if (error?.error?.message) {
          errorMessage = error.error.message;
          type = error.error.type;
        }
        this.globalService.openCustomSnackbar(errorMessage, type);
        return throwError(() => error);
      })
    );
  }
}
