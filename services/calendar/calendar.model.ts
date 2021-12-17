export interface MakeNewsDto {
  title: string;

  content: string;

  status: NewsStatus;

  categoryId: number;
}

export interface UpdateNewsDto extends MakeNewsDto {

}

export enum NewsStatus {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
  NONE = 'none',
}


export enum ModalEditType{
  EDIT_EVENT = 'edit',
  MAKE_EVENT = 'make'
}