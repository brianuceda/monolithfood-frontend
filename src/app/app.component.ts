import { PrivateService } from 'src/app/core/services/private.service';
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
    private PrivateService: PrivateService,
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
      setCompletedTokenRoleUser: this.setCompletedTokenRoleUser.bind(this),
      setCompletedTokenRoleVip: this.setCompletedTokenRoleVip.bind(this),
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
    return this.PrivateService.isDialogOpened();
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
  public setCompletedTokenRoleUser(): void {
    localStorage.removeItem('token');
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dLCJwcm9maWxlU3RhZ2UiOiJjb21wbGV0ZWQiLCJzdWIiOiJraXJpZGVwYXBlbCIsImlhdCI6MTY5OTE5MjQ0MCwiZXhwIjoxNjk5Nzk3MjQwfQ.PULJSntCo-qGGIqozYhhfmIk-NctZW3h0J0Ly410kG0'
    );
    window.location.reload();
  }
  public setCompletedTokenRoleVip(): void {
    localStorage.removeItem('token');
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9WSVAifSx7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwicHJvZmlsZVN0YWdlIjoiY29tcGxldGVkIiwic3ViIjoia2lyaWRlcGFwZWwiLCJpYXQiOjE2OTkxOTUyMzMsImV4cCI6MTY5OTgwMDAzM30.ipWTaUiZG0WmP9l-uyziyzOnkJXBsPd3YUrhKjYs_14'
    );
    window.location.reload();
  }
}
