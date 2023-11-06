// can-see-item.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { ISidebarData } from './helper';
import { PrivateService } from 'src/app/core/services/private.service';

@Pipe({
  name: 'canSeeItem',
  pure: true,
})
export class CanSeeItemPipe implements PipeTransform {
  constructor(private privateService: PrivateService) {}

  transform(item: ISidebarData): boolean {
    return this.canSeeItem(item);
  }

  canSeeItem(item: ISidebarData): boolean {
    // Si no hay roles requeridos, todos pueden ver el ítem
    if (!item.requiredRoles) {
      return true;
    }
    // Verifica si el usuario tiene alguno de los roles requeridos para el ítem
    return this.privateService.hasRequiredRoles(item.requiredRoles);
  }
}
