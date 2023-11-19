import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
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
import { HttpService } from 'src/app/core/services/http.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authApiUrl: string = environment.api + environment.rscAuth;
  private userApiUrl: string = environment.api + environment.rscUsers;
  private oauthUrl: string = environment.oauthUrl;
  private ipApiUrl = 'https://api.country.is';

  constructor(
    private globalService: GlobalService,
    private http: HttpClient,
    private httpService: HttpService,
    private router: Router
  ) {}

  // * Login
  public login(loginData: LoginRequestDTO): Observable<AuthResponse> {
    let ipAddress: string = this.getPublicIP();
    if (ipAddress) {
      loginData.ipAddress = ipAddress;
    }
    return this.httpService
      .postBodySimple<AuthResponse>(this.authApiUrl + '/login', loginData)
      .pipe(
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

  // * Register
  public register(registerData: RegisterRequestDTO): Observable<AuthResponse> {
    let ipAddress: string = this.getPublicIP();
    if (ipAddress) {
      registerData.ipAddress = ipAddress;
    }
    return this.httpService
      .postBodySimple<AuthResponse>(this.authApiUrl + '/register', registerData)
      .pipe(
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

  // * OAuth2
  googleOauth2(): void {
    window.location.href = `${this.oauthUrl}/google`;
  }

  microsoftOauth2(): void {
    window.location.href = `${this.oauthUrl}/microsoft`;
  }

  githubOauth2(): void {
    window.location.href = `${this.oauthUrl}/github`;
  }

  setBasicOauth2Data(): Observable<any> {
    let ipAddress: string = this.getPublicIP();
    if (ipAddress) {
      return this.httpService.postSimple(
        this.authApiUrl + '/set-basic-oauth2-data',
        {
          ipAddress: ipAddress,
        }
      );
    }
    return of(null);
  }

  // * Logout
  public logout(): void {
    this.httpService.postSimple(this.userApiUrl + '/logout').subscribe({
      next: (data) => {
        console.log(data);
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
      },
    });
  }

  // * Obtener dirección IP
  public getPublicIP(): string {
    const storedIp = localStorage.getItem('ipAddress');
    if (storedIp) {
      return storedIp;
    } else {
      this.http.get<any>('http://ip-api.com/json/').subscribe((data) => {
        const ip = data.query;
        localStorage.setItem('ipAddress', ip);
        return ip;
      });
      console.log('No se pudo obtener la direccion IP');
      return '';
    }
  }
  // public getIpAddress(): string {
  //   const storedIp = localStorage.getItem('ipAddress');
  //   if (storedIp) {
  //     // Si la IP ya está almacenada, la devuelve como un observable
  //     return of(storedIp);
  //   } else {
  //     // Si la IP no está almacenada, realiza la solicitud HTTP
  //     return this.http.get<{ ip: string }>(this.ipApiUrl).pipe(
  //       map((response) => {
  //         localStorage.setItem('ipAddress', response.ip);
  //         return response.ip;
  //       }),
  //       catchError((error) => {
  //         this.globalService.openCustomSnackbar(
  //           'Error obteniendo su IP',
  //           ResponseType.ERROR
  //         );
  //         return throwError(() => new Error('Error obtaining IP address'));
  //       })
  //     );
  //   }
  // }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
