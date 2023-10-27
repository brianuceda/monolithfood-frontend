import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    const currentRoute = route.url[0]?.path;

    if (token) {
      try {
        const payload = this.authService.decodeJwtPayload(token);
        if (!this.authService.isValidTokenStructure(payload)) {
          localStorage.clear();
          this.router.navigateByUrl('/login');
          return false;
        }
        // Si la ruta es '/dashboard', permitir acceso.
        if (currentRoute === 'dashboard') {
          return true;
        }
        // Si profileStage es 'completed', permitir el acceso.
        if (payload?.profileStage === 'completed') {
          return true;
        } else {
          // Si profileStage no es 'completed', redirigir a '/dashboard'.
          this.router.navigateByUrl('/dashboard');
          return false;
        }
      } catch (error) {
        localStorage.clear();
        this.router.navigateByUrl('/login');
        return false;
      }
    } else {
      localStorage.clear();
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
