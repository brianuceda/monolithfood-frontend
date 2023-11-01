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
      setCompletedToken: this.setCompletedToken.bind(this),
      setPersonalInfoToken: this.setPersonalInfoToken.bind(this),
      setActivityLevelToken: this.setActivityLevelToken.bind(this),
      setObjectivesToken: this.setObjectivesToken.bind(this),
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
  public setCompletedToken(): void {
    localStorage.removeItem('token');
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlU3RhZ2UiOiJjb21wbGV0ZWQiLCJzdWIiOiJraXJpZGVwYXBlbCIsImlhdCI6MTY5ODgyNTYyMSwiZXhwIjoxNjk5NDMwNDIxfQ.E0pwsTop7anh6DRWDOrwzG5LNTHZHTEy1mizLGXX6dI'
    );
  }
  public setPersonalInfoToken(): void {
    localStorage.removeItem('token');
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlU3RhZ2UiOiJwZXJzb25hbEluZm8iLCJzdWIiOiJraXdpZ29kIiwiaWF0IjoxNjk4MzQ1ODY4LCJleHAiOjE2OTg5NTA2Njh9.N5KTXyHBlxyvLdiiSUElvEOsJTcyOoUdNoPtF8zLFlw'
    );
  }
  public setActivityLevelToken(): void {
    localStorage.removeItem('token');
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlU3RhZ2UiOiJhY3Rpdml0eUxldmVsIiwic3ViIjoia2l3aWdvZCIsImlhdCI6MTY5ODM4NDM4OSwiZXhwIjoxNjk4OTg5MTg5fQ.p6bLaNe1skqGgNLGTb65cdKI6piyw5zGB2N8QMKVT04'
    );
  }
  public setObjectivesToken(): void {
    localStorage.removeItem('token');
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlU3RhZ2UiOiJvYmplY3RpdmVzIiwic3ViIjoia2l3aWdvZCIsImlhdCI6MTY5ODM4NDU4OSwiZXhwIjoxNjk4OTg5Mzg5fQ.QMITQE6p9w12N0X33T5xv3Wi8txOr5dL1ivUTdHlIDo'
    );
  }
}
