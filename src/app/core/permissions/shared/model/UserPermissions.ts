import { IAccessRules } from '../interface/IPermissions';

export class UserPermissions {
    user: number;
    name: string;
    accessRules: IAccessRules[];

    constructor(userId: number, name: string) {
        this.user = userId;
        this.name = name;
        this.accessRules = [
            {
                menu: 'customers',
                canAccessMenu: true,
                actionsAccessRules: [
                    {
                        canSearch: true,
                        canVisualize: true
                    }
                ]
            },
            {
                menu: 'sales-orders',
                canAccessMenu: true,
                actionsAccessRules: [
                    {
                        canSearch: true,
                        canVisualize: true,
                        canInclude: true,
                        canUpdate: true,
                        canDelete: true
                    }
                ]
            }
        ];
    }
}
