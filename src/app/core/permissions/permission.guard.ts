import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PermissionsService } from './shared/services/permissions.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private permissionsService: PermissionsService,
    private router: Router
  ){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // 0 - Clientes ou 1 Pedidos
    const menu = state.url.includes('/customers/') ? 0 : 1;
    const isAccess = this.permissionsService.canVisualizeById(menu);

    if (!isAccess) {
      this.router.navigate(['access-denied']);
    }

    return this.permissionsService.canVisualizeById(menu);
  }
}
