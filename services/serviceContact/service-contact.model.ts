export interface IServiceContactDetail {
  index: number;
  id: string;
  objective: string;
  contactID: string;
  contactPhoneNumber: string;
  status: string;
  name: string;
  adminId: number;
  createdDate: Date;
  updatedDate: Date;
}

export interface IServiceContact {
  id: string;
  title: string;
  status: string;
  index: number;
  createdDate: Date;
  updatedDate: Date;
  serviceContactDetail: IServiceContactDetail[];
}

export interface ICreateServiceContactItem {
  objective: string;
  contactID: string;
  contactPhoneNumber: string;
  name: string;
  categoryId: string;
  index: number;
}

export interface IUpdateServiceContactItem extends Partial<ICreateServiceContactItem>{
  id: string;
}

export interface ICreateServiceContactCategory {
  title: string;
  index: number;
}

export interface IUpdateServiceContactCategory extends Partial<ICreateServiceContactCategory>{
  id: string;
}

export enum ETypeOfEditing {
  CREATE = 'create',
  UPDATED = 'update'
}