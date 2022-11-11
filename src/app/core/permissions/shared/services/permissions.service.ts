import { Injectable } from '@angular/core';
import { IPermissions } from './../interface/IPermissions';
import { UserPermissions } from './../model/UserPermissions';

@Injectable({
    providedIn: 'root'
})
export class PermissionsService {
  userPermission: IPermissions = new UserPermissions(1, 'Marshall Eriksen');
  constructor() {}

  updatePermissionCustomer(canAccess: boolean): void {
    this.userPermission.accessRules[0].actionsAccessRules[0].canVisualize = canAccess;
  }

  canVisualizeById(id: number = 0): boolean {
    return this.userPermission.accessRules[id].actionsAccessRules[0].canVisualize || false;
  }
}
