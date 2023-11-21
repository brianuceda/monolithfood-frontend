import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isInProduction = environment.production;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Agrega el token al headers en todas las solicitudes HTTP
    const token = localStorage.getItem('token');
    let authReq = req;

    if (token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
    }

    return next.handle(authReq).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (this.isInProduction) {
            console.log('Esperando respuesta de:', evt.url);
            console.log('Cuerpo de la solicitud recibida:', evt.body);
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (this.isInProduction) {
          console.error(
            'Request to:',
            authReq.url,
            'failed with status:',
            error.status
          );
          console.error('Error response:', error);
        }
        // Handle the error and continue
        return throwError(() => error);
      })
    );
  }
}
