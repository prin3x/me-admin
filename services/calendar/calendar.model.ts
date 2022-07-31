export interface MakeNewsDto {
  title: string;

  content: string;

  start: string;

  end: string;

  hyperlink: string;

  allDay: boolean;

  status: NewsStatus;

  categoryName: string;
}

export interface UpdateNewsDto extends MakeNewsDto {}

export interface ICalendarPagination {
  items: ICalendarEntity[];
  itemCount: number;
  total: number;
  page: number;
}


export interface ICalendarEntity {
  id: number;

  title: string;

  description: string;

  start: Date;

  end: Date;

  allDay: boolean;

  createdDate: Date;

  updatedDate: Date;

  createdBy: number;

  categoryName: ECalendarEventType;

  roomIds: number;

  hyperlink: string;
}

export enum NewsStatus {
  ENABLED = "enabled",
  DISABLED = "disabled",
  NONE = "none",
}

export enum ModalEditType {
  EDIT_EVENT = "edit",
  MAKE_EVENT = "make",
}

export class ListQueryCalendarDTO {
  startDate: string;

  endDate: string;
}

export class ListCalendarDTO {
  year: string;

  category: ECalendarEventType;

  page: number;

  startMonth?: number;
}

export enum ECalendarEventType {
  EVENT = "event",
  BIRTHDAY = "birthday",
  HOLIDAY = "holiday",
  OTHER = "other",
}
