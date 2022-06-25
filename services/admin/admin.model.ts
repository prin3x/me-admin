export enum ADMIN_STATUS {
  ENABLED = "enabled",
  DISABLED = "disabled",
}

export enum ADMIN_ROLES {
  USER = "user",
  ADMIN = "admin",
  SUPER_ADMIN = "superAdmin",
}

export interface IAdminModel {
  id: number;

  username: string;

  password: string;

  status: ADMIN_STATUS;

  role: ADMIN_ROLES;

  createdDate: Date;

  updatedDate: Date;
}

export interface IAdminJWT {
  username: string;
  id: number;
  role: ADMIN_ROLES;
  iat: number;
}

export class CreateAdminDto {
  username: string;

  password: string;

  role: ADMIN_ROLES;
}

export class UpdateAdminDto {
  id: number;

  username?: string;

  password?: string;

  role?: ADMIN_ROLES;
}


export interface IAdminData {
    items: IAdminModel[];
    itemCount: number;
    total: number;
    page: number;
}

export enum AdminModalType {
    NEW = "new",
    EDIT = "edit",
    NONE = "none",
  }
  
  export interface AdminManagerModel extends IAdminModel {
    modalType: AdminModalType;
  }
  