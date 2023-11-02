import {
  Observable,
  tap,
  catchError,
  throwError,
  map,
  switchMap,
  of,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenPayload } from 'src/app/core/interfaces/token-payload.model';
import { TokenProfileStages } from 'src/app/shared/interfaces/token-profile-stages.model';
import { environment } from 'src/environments/environment.prod';
import { LoginRequestDTO } from '../interfaces/LoginRequestDTO';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ResponseType } from '../interfaces/ResponseType';
import { RegisterRequestDTO } from '../interfaces/RegisterRequestDTO';
import { AuthResponse } from '../interfaces/AuthResponse';

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
          localStorage.setItem('ipAddress', response.ip); // Guarda la IP en localStorage
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

  // * Token
  // Retorna true si el token existe
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
  // Valida la estructura del token
  public isValidTokenStructure(decoded: any): decoded is TokenPayload {
    return (
      decoded &&
      typeof decoded.profileStage === 'string' &&
      typeof decoded.sub === 'string' &&
      typeof decoded.iat === 'number' &&
      typeof decoded.exp === 'number' &&
      // Asegura que solo hay 4 propiedades en el token
      Object.keys(decoded).length === 4
    );
  }
  // Verifica si hay algun Dialog abierto en base al payload del token JWT
  public isDialogOpened(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const profileStage = this.decodeJwtPayload(token).profileStage;
    return TokenProfileStages.some(
      (stageObj) => stageObj.stage === profileStage
    );
  }
  // Decodifica el token y retorna el payload
  public decodeJwtPayload(jwtToken: string): any {
    try {
      const payloadBase64 = jwtToken.split('.')[1];
      const payloadJson = atob(payloadBase64);
      return JSON.parse(payloadJson);
    } catch (err) {
      console.error('Error decodificando el token de autenticacion: ', err);
      return null;
    }
  }
}
