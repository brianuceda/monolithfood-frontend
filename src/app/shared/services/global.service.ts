import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { CustomSnackbarComponent } from '../components/custom-snackbar/custom-snackbar.component';

enum ResponseType {
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FAVORITE = 'FAVORITE',
}

interface CustomSnackbarData {
  type: string;
  icon: string;
  action: string;
}

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(private snackBar: MatSnackBar) {}
  // Snackbar Attributes
  horizontalPos: MatSnackBarHorizontalPosition = 'right';
  verticalPos: MatSnackBarVerticalPosition = 'bottom';
  // Subjects: Tipos de Observables que permiten cambiar su valor y notificarlo a todos los suscriptores que estén escuchando.
  private titleSubject = new BehaviorSubject<string>('');
  private isExpandedSubject = new BehaviorSubject<boolean>(true);
  // Objservables: Emiten valores y pueden ser escuchados por suscriptores.
  currentTitle$ = this.titleSubject.asObservable();
  isSidebarExpanded$ = this.isExpandedSubject.asObservable();

  // Título: Cambiar
  public setTitle(title: string): void {
    this.titleSubject.next(title);
  }
  // Validación: Es una ruta privada?
  public isPrivateRoute(path: string): boolean {
    const publicRoutes = [
      '/',
      '/home',
      '/about-us',
      '/login',
      '/register',
      '/server/error',
    ];
    return !publicRoutes.includes(path);
  }
  // Validación: Está en el dashboard?
  public isDashboardRoute(path: string): boolean {
    const dashboardRoutes = ['/dashboard'];
    return dashboardRoutes.includes(path);
  }
  // Sidebar: Expandir o contraer
  public toggleSidebar(): void {
    this.isExpandedSubject.next(!this.isExpandedSubject.value);
  }
  // Snackbar: Abrir o cerrar
  public openCustomSnackbar(message: string, type: string): void {
    let data: CustomSnackbarData = {
      type: type,
      icon: '',
      action: 'Cerrar',
    };
    data = this.selectTypeOfSnackBar(data);
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      horizontalPosition: this.horizontalPos,
      verticalPosition: this.verticalPos,
      duration: 3000,
      data: {
        message: message,
        action: data.action,
        icon: data.icon,
        snackBar: this.snackBar,
      },
      panelClass: [data.type],
    });
  }
  selectTypeOfSnackBar(data: CustomSnackbarData): CustomSnackbarData {
    switch (data.type) {
      // Basic
      case ResponseType.SUCCESS:
        data.type = 'success-snackbar';
        data.icon = 'done';
        data.action = 'Hecho';
        return data;
      case ResponseType.INFO:
        data.type = 'info-snackbar';
        data.icon = 'info';
        data.action = 'Hecho';
        return data;
      case ResponseType.WARN:
        data.type = 'warn-snackbar';
        data.icon = 'error';
        data.action = 'Hecho';
        return data;
      case ResponseType.ERROR:
        data.type = 'error-snackbar';
        data.icon = 'warning';
        data.action = 'Cerrar';
        return data;
      case ResponseType.FAVORITE:
        data.type = 'favorite-snackbar';
        data.icon = 'favorite';
        data.action = 'Hecho';
        return data;
      default:
        data.type = 'success-snackbar';
        data.icon = 'done';
        return data;
    }
  }
  public closeCustomSnackbar(): void {
    this.snackBar.dismiss();
  }
}
