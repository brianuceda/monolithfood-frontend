import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PublicAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    const currentRoute = route.url[0]?.path;

    if (token) {
      try {
        console.log('currentRoute', currentRoute);
        if (currentRoute === 'login' || currentRoute === 'register') {
          this.router.navigateByUrl('/dashboard');
          return false;
        } else {
          return true;
        }
      } catch (error) {
        localStorage.clear();
        this.router.navigateByUrl('/login');
        return false;
      }
    } else {
      return true;
    }
  }
}
