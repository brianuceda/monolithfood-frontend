import { PrivateService } from 'src/app/core/services/private.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private privateService: PrivateService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    const currentRoute = route.url[0]?.path;

    if (token) {
      try {
        const payload = this.privateService.decodeJwtPayload(token);
        // Si el token no tiene la estructura correcta, redirigir a '/login'.
        if (!this.privateService.isValidTokenStructure(payload)) {
          localStorage.removeItem('token');
          this.router.navigateByUrl('/login');
          return false;
        }
        // Si el usurio está en una ruta privada y su perfil está completado, permitir el acceso.
        if (
          payload?.profileStage === 'completed' ||
          currentRoute === 'dashboard'
        ) {
          return true;
        } else {
          // Si profileStage no es 'completed', redirigir a '/dashboard'.
          this.router.navigateByUrl('/dashboard');
          return false;
        }
      } catch (error) {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
        return false;
      }
    } else {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
