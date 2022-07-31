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
  index: number;
  adminId: number;
  createdDate: Date;
  updatedDate: Date;
}

export interface IFormsRequest {
  id: string;
  title: string;
  status: string;
  index: number;
  createdDate: Date;
  updatedDate: Date;
  formsRequestDetail: IFormsRequestDetail[];
}

export interface ICreateFormsRequestItem {
  downloadLink: EFormsRequest;
  categoryId?: string;
  content: string;
  file: any;
  index: number;
}

export interface IUpdateFormsRequestItem
  extends Partial<ICreateFormsRequestItem> {
  id: string;
}

export interface ICreateFormsRequestCategory {
  title: string;
  index: number;
}

export interface IUpdateFormsRequestCategory
  extends Partial<ICreateFormsRequestCategory> {
  id: string;
}

export enum ETypeOfEditing {
  CREATE = "create",
  UPDATED = "update",
}
