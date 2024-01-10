import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError, of } from 'rxjs';
import { AuthResponse } from 'src/app/core/interfaces/AuthResponse';
import { LoginRequestDTO } from 'src/app/core/interfaces/LoginRequestDTO';
import { RegisterRequestDTO } from 'src/app/core/interfaces/RegisterRequestDTO';
import { ResponseType } from 'src/app/core/interfaces/ResponseType';
import { HttpService } from 'src/app/core/services/http.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { environment } from 'src/environments/environment-prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authApiUrl: string = environment.API + environment.rscAuth;
  private userApiUrl: string = environment.API + environment.rscUsers;
  private oauthUrl: string = environment.OAUTH2_URL;

  constructor(
    private globalService: GlobalService,
    private httpService: HttpService,
    private router: Router
  ) {}

  // * Login
  public login(loginData: LoginRequestDTO): Observable<AuthResponse> {
    return this.httpService
      .postBodySimple<AuthResponse>(this.authApiUrl + '/login', loginData)
      .pipe(
        tap((response) => {
          this.saveToken(response.token);
          this.router.navigateByUrl('/dashboard');
        }),
        catchError((error) => {
          if (error.error.message) {
            this.globalService.openCustomSnackbar(
              error.error.message,
              ResponseType.ERROR
            );
          } else {
            this.globalService.openCustomSnackbar(
              'Ocurrió un error interno',
              ResponseType.ERROR
            );
          }
          return throwError(() => new Error('No se pudo iniciar sesión'));
        })
      );
  }

  // * Register
  public register(registerData: RegisterRequestDTO): Observable<AuthResponse> {
    return this.httpService
      .postBodySimple<AuthResponse>(this.authApiUrl + '/register', registerData)
      .pipe(
        tap((response) => {
          this.saveToken(response.token);
          this.router.navigateByUrl('/dashboard');
        }),
        catchError((error) => {
          if (error.error.message) {
            this.globalService.openCustomSnackbar(
              error.error.message,
              ResponseType.ERROR
            );
          } else {
            this.globalService.openCustomSnackbar(
              'Ocurrió un error interno',
              ResponseType.ERROR
            );
          }
          return throwError(() => new Error('No se pudo registrar'));
        })
      );
  }

  // * OAuth2
  googleOauth2(): void {
    window.location.href = `${this.oauthUrl}/google`;
  }

  microsoftOauth2(): void {
    window.location.href = `${environment.OAUTH2_URL_MICROSOFT}/microsoft`;
  }

  githubOauth2(): void {
    window.location.href = `${this.oauthUrl}/github`;
  }

  setBasicOauth2Data(): Observable<any> {
    return this.httpService.postSimple(
      this.authApiUrl + '/set-basic-oauth2-data'
    );
  }

  // * Logout
  public logout(): void {
    this.httpService.postSimple(this.userApiUrl + '/logout').subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
      },
    });
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
