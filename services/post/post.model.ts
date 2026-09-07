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



// Mirrors POST_LIST_SELECT on the backend; list endpoints omit `content`.
export interface IPostItem {
  id: number;
  imageUrl: string;
  homeImageUrl: string;
  title: string;
  description: string;
  status: string;
  adminId: number;
  readers: number;
  categoryName: string;
  postBy: string;
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