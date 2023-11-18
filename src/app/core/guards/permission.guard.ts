import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { PrivateService } from 'src/app/core/services/private.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private router: Router, private privateService: PrivateService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    // Si no hay token, redirigir a '/login'.
    if (!token) {
      this.redirectToLogin();
      return false;
    }
    try {
      // Verifica que el token tenga la estructura correcta
      const payload = this.privateService.decodeJwtPayload(token);
      if (!this.privateService.isValidTokenStructure(payload)) {
        this.redirectToLogin();
        return false;
      }
      // Verifica que el usuario tenga los roles requeridos
      const requiredRoles = route.data['roles'] as Array<string>;
      if (
        requiredRoles &&
        !this.privateService.hasRequiredRoles(requiredRoles)
      ) {
        // Si el usuario no tiene los roles requeridos, redirigir a '/dashboard'.
        this.router.navigate(['/dashboard']);
        return false;
      }
      // Si el usuario tiene los roles requeridos, permitir el acceso.
      return true;
    } catch (error) {
      this.redirectToLogin();
      return false;
    }
  }

  // Redirige a '/login' y elimina el token del localStorage si el token no es válido o si ocurre un error
  private redirectToLogin(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
