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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let authReq = req;

    if (token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
    }

    console.log('Outgoing request details:');
    console.log('URL:', authReq.url);
    console.log('Method:', authReq.method);
    console.log(
      'Headers:',
      authReq.headers.keys().map((key) => `${key}: ${authReq.headers.get(key)}`)
    );
    console.log('Body:', authReq.body);

    return next.handle(authReq).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          console.log('Response for:', evt.url);
          console.log('Response status:', evt.status);
          console.log('Response body:', evt.body);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Request failed:', error.message);
        console.error('Failed request details:', {
          url: authReq.url,
          status: error.status,
          error: error.error,
        });
        return throwError(() => error);
      })
    );
  }
}
