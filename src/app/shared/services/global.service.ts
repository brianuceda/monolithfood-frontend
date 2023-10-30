import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  // Subjects: Tipos de Observables que permiten cambiar su valor y notificarlo a todos los suscriptores que estén escuchando.
  private titleSubject = new BehaviorSubject<string>('');
  private isExpandedSubject = new BehaviorSubject<boolean>(true);
  // Objservables: Emiten valores y pueden ser escuchados por suscriptores.
  currentTitle$ = this.titleSubject.asObservable();
  isSidebarExpanded$ = this.isExpandedSubject.asObservable();

  // Métodos: Pambiar el valor de los Subjects.
  public setTitle(title: string): void {
    this.titleSubject.next(title);
  }
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
  public isDashboardRoute(path: string): boolean {
    const dashboardRoutes = ['/dashboard'];
    return dashboardRoutes.includes(path);
  }
  public toggleSidebar(): void {
    this.isExpandedSubject.next(!this.isExpandedSubject.value);
  }
}
