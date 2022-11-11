export interface IPermissions {
  user: number;
  name: string;
  accessRules: IAccessRules[];
}

export interface IAccessRules {
  menu: string;
  canAccessMenu: boolean;
  actionsAccessRules: IActionsAccessRules[];
}

export interface IActionsAccessRules {
  canSearch?: boolean;
  canVisualize?: boolean;
  canInclude?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
}
