import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GlobalService } from './shared/services/global.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Monolith Food';
  isSidebarExpanded!: boolean;
  actualPath!: string;

  constructor(
    private authService: AuthService,
    private globalService: GlobalService,
    private router: Router
  ) {
    this.globalService.isSidebarExpanded$.subscribe(
      (expanded) => (this.isSidebarExpanded = expanded)
    );
  }

  ngOnInit(): void {
    this.setActualPath(); // Establecer el path inicial
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd) // Filtrar solo eventos de finalización de navegación
      )
      .subscribe(() => {
        this.setActualPath(); // Actualizar el path cada vez que cambia la ruta
      });
    (window as any).app = {
      setToken: this.setToken.bind(this),
      setInfoToken: this.setInfoToken.bind(this),
      setActivityLevelToken: this.setActivityLevelToken.bind(this),
      setObjectivesToken: this.setObjectivesToken.bind(this),
      setCompletedToken: this.setCompletedToken.bind(this),
    };
  }

  // * Metodos
  // El usuario está en una ruta privada? (rutas que requieren autenticación)
  isPrivateRoute(): boolean {
    let isPrivateRoute = this.globalService.isPrivateRoute(this.router.url);
    return isPrivateRoute;
  }
  // El usuario no está en la página de error
  notIsErrorPage(): boolean {
    return this.router.url !== '/server/error';
  }
  // El usuario está en alguna página de autenticación (login o register)
  isInAuthPage(): boolean {
    return (
      this.actualPath === 'login-auth-page' ||
      this.actualPath === 'register-auth-page'
    );
  }
  // Si hay algún dashboard abierto, ocultar el overflow del body
  isDialogOpened(): boolean {
    return this.authService.isDialogOpened();
  }

  // * Funciones
  private setActualPath(): void {
    if (this.router.url === '/login') {
      this.actualPath = 'login-auth-page';
    } else if (this.router.url === '/register') {
      this.actualPath = 'register-auth-page';
    } else {
      this.actualPath = this.router.url;
    }
  }
  public setToken(token: string): void {
    localStorage.removeItem('token');
    localStorage.setItem('token', token);
  }
  public setInfoToken(): void {
    localStorage.removeItem('token');
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlU3RhZ2UiOiJpbmZvcm1hdGlvbiIsInN1YiI6Imtpd2lnb2QiLCJpYXQiOjE2OTg4NDAxNDIsImV4cCI6MTY5OTQ0NDk0Mn0.mzeT5-jDgptDDSIwqOcOWvAcTAOanv2DRJr9DGhLHl0'
    );
    window.location.reload();
  }
  public setActivityLevelToken(): void {
    localStorage.removeItem('token');
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlU3RhZ2UiOiJhY3Rpdml0eS1sZXZlbCIsInN1YiI6Imtpd2lnb2QiLCJpYXQiOjE2OTg4NDQwNjIsImV4cCI6MTY5OTQ0ODg2Mn0.OmzaqEmHnNS4ClDF9HqUFVRc2EDGsu71cR0El8vGZtA'
    );
    window.location.reload();
  }
  public setObjectivesToken(): void {
    localStorage.removeItem('token');
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlU3RhZ2UiOiJvYmplY3RpdmVzIiwic3ViIjoia2l3aWdvZCIsImlhdCI6MTY5ODg0NDE3MywiZXhwIjoxNjk5NDQ4OTczfQ.P32ySXsEFOIsGMBnoTswtwrYwdnyH2kzHKc7CN5NhU0'
    );
    window.location.reload();
  }
  public setCompletedToken(): void {
    localStorage.removeItem('token');
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlU3RhZ2UiOiJjb21wbGV0ZWQiLCJzdWIiOiJraXdpZ29kIiwiaWF0IjoxNjk4ODQ0NTYxLCJleHAiOjE2OTk0NDkzNjF9.gtjrsiwCw7uvFigwqiROsI00CRqpRgKpqTcvtuOV4G8'
    );
    window.location.reload();
  }
}
