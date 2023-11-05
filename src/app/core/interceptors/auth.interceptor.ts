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
    // Agrega el token al headers en todas las solicitudes HTTP
    const token = localStorage.getItem('token');
    let authReq = req;

    if (token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
    }

    // console.log('Outgoing request to:', authReq.url);

    return next.handle(authReq).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          console.log('Esperando respuesta de:', evt.url);
          console.log('Cuerpo de la solicitud recibida:', evt.body);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(
          'Request to:',
          authReq.url,
          'failed with status:',
          error.status
        );
        console.error('Error response:', error);
        // Handle the error and continue
        return throwError(() => error);
      })
    );
  }
}

// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor() {}

//   // Agrega el token al headers en todas las solicitudes HTTP
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const cloned = req.clone({
//         headers: req.headers.set('Authorization', 'Bearer ' + token),
//       });
//       return next.handle(cloned);
//     } else {
//       return next.handle(req);
//     }
//   }
// }
