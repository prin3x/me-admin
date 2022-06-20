export enum EFormsRequest {
  ENABLED = "enabled",
  DISABLED = "disabled",
  NONE = "none",
}

export interface IFormsRequestDetail {
  id: string;
  content: string;
  downloadLink: EFormsRequest;
  status: string;
  adminId: number;
  createdDate: Date;
  updatedDate: Date;
}

export interface IFormsRequest {
  id: string;
  title: string;
  status: string;
  createdDate: Date;
  updatedDate: Date;
  formsRequestDetail: IFormsRequestDetail[];
}

export interface ICreateFormsRequestItem {
  downloadLink: EFormsRequest;
  categoryDetail: string;
}

export interface IUpdateFormsRequestItem
  extends Partial<ICreateFormsRequestItem> {
  id: string;
}

export interface ICreateFormsRequestCategory {
  title: string;
}

export interface IUpdateFormsRequestCategory
  extends Partial<ICreateFormsRequestCategory> {
  id: string;
}

export enum ETypeOfEditing {
  CREATE = "create",
  UPDATED = "update",
}
