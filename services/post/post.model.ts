import { ListQueryParams } from "../contact/contact.model";

export enum EDITOR_TYPE {
  EDIT = 'edit',
  MAKE = 'make',
}

export enum POST_STATUS {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
  NONE = 'none',
}

export interface POST_RESPOSE {
  id?: string;
  content: string;
  title: string;
  categoryName: string;
  status?: POST_STATUS;
  createdDate?: string;
  updatedDate?: string;
}



export interface IPostItem {
  id: number;
  imageUrl: string;
  title: string;
  content: string;
  status: string;
  adminId: number;
  categoryName: string;
  slug: string;
  tag: string;
  createdDate: Date;
  updatedDate: Date;
}

export interface IPostStruct {
  items: IPostItem[];
  itemCount: number;
  total: number;
  page: number;
}

export interface EDITOR_BODY extends POST_RESPOSE {
}


export interface ListQueryPost extends ListQueryParams {
  categoryName?: string;
}

export enum EPostCategory {
  ANNOUNCEMENT = "announcement",
  IT = "itclinic",
  ACTIVITY = "activity",
}