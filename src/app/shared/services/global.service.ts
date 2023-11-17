import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomSnackbarComponent } from '../components/custom-snackbar/custom-snackbar.component';
import { ResponseType } from 'src/app/core/interfaces/ResponseType';
import { MatDialogConfig } from '@angular/material/dialog';
import { GetUser } from '../interfaces/GetUser';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment.prod';

interface CustomSnackbarData {
  type: string;
  icon: string;
  action: string;
}

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  horizontalPos: MatSnackBarHorizontalPosition = 'right';
  verticalPos: MatSnackBarVerticalPosition = 'bottom';
  private titleSubject = new BehaviorSubject<string>('');
  private isExpandedSubject = new BehaviorSubject<boolean>(true);
  currentTitle$ = this.titleSubject.asObservable();
  isSidebarExpanded$ = this.isExpandedSubject.asObservable();

  constructor(private snackBar: MatSnackBar) {}

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
  public openCustomSnackbar(message: string, type: ResponseType): void {
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

  public getDialogConfig(
    width: string,
    height: string,
    disableClose: boolean,
    closeOnNavigation: boolean,
    data: any = null
  ): MatDialogConfig {
    const config = new MatDialogConfig();
    config.disableClose = disableClose || false;
    config.autoFocus = true;
    config.hasBackdrop = true;
    config.closeOnNavigation = closeOnNavigation || false;
    config.width = width || '1080px';
    config.height = height || '650px';
    config.enterAnimationDuration = 700;
    config.exitAnimationDuration = 700;
    config.backdropClass = 'style-css-dialog-background';
    config.data = data || null;
    return config;
  }
}
