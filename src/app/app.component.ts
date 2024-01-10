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
}
