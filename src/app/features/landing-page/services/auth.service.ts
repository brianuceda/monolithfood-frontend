import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Observable,
  switchMap,
  tap,
  catchError,
  throwError,
  of,
  map,
} from 'rxjs';
import { AuthResponse } from 'src/app/core/interfaces/AuthResponse';
import { LoginRequestDTO } from 'src/app/core/interfaces/LoginRequestDTO';
import { RegisterRequestDTO } from 'src/app/core/interfaces/RegisterRequestDTO';
import { ResponseType } from 'src/app/core/interfaces/ResponseType';
import { GlobalService } from 'src/app/shared/services/global.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authApiUrl: string = environment.api + environment.rscAuth;
  private ipApiUrl = 'https://api.country.is';

  constructor(
    private globalService: GlobalService,
    private http: HttpClient,
    private router: Router
  ) {}

  // * Login
  public login(loginData: LoginRequestDTO): Observable<AuthResponse> {
    return this.getIpAddress().pipe(
      switchMap((ipAddress) => {
        loginData.ipAddress = ipAddress;
        return this.http.post<AuthResponse>(
          this.authApiUrl + '/login',
          loginData
        );
      }),
      tap((response) => {
        this.saveToken(response.token);
        this.router.navigateByUrl('/dashboard');
      }),
      catchError((error) => {
        this.globalService.openCustomSnackbar(
          error.error.message,
          ResponseType.ERROR
        );
        return throwError(() => new Error('Error durante el inicio de sesión'));
      })
    );
  }

  // * Register
  public register(registerData: RegisterRequestDTO): Observable<AuthResponse> {
    return this.getIpAddress().pipe(
      switchMap((ipAddress) => {
        registerData.ipAddress = ipAddress;
        return this.http.post<AuthResponse>(
          this.authApiUrl + '/register',
          registerData
        );
      }),
      tap((response) => {
        this.saveToken(response.token);
        this.router.navigateByUrl('/dashboard');
      }),
      catchError((error) => {
        this.globalService.openCustomSnackbar(
          error.error.message,
          ResponseType.ERROR
        );
        return throwError(() => new Error('Error durante el registro'));
      })
    );
  }

  // * Forgot Password

  // * Logout
  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  // * Obtener dirección IP
  public getIpAddress(): Observable<string> {
    const storedIp = localStorage.getItem('ipAddress');
    if (storedIp) {
      // Si la IP ya está almacenada, la devuelve como un observable
      return of(storedIp);
    } else {
      // Si la IP no está almacenada, realiza la solicitud HTTP
      return this.http.get<{ ip: string }>(this.ipApiUrl).pipe(
        map((response) => {
          localStorage.setItem('ipAddress', response.ip);
          return response.ip;
        }),
        catchError((error) => {
          this.globalService.openCustomSnackbar(
            'Error obteniendo su IP',
            ResponseType.ERROR
          );
          return throwError(() => new Error('Error obtaining IP address'));
        })
      );
    }
  }
  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
