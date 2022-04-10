export interface ICreateMeeting {
  title: string;

  description: string;

  date: any;

  start: string;

  end: string;

  roomId: number;

  type: MeetingEventType;

  allDay: boolean;
}

export interface IRoom {
  id: number;
  imageUrl: string;
  name: string;
  capacity: number;
  description: string;
  floor: string;
  createdDate: Date;
  updatedDate: Date;
  createdBy: number;
}

export enum MeetingEventType {
  INTERNAL = "internal",
  EXTERNAL = "external",
}

export enum EMakeStatus {
  MAKE = "MAKE",
  EDIT = "EDIT",
  READ = "READ",
}

export interface IRoomResponse {
  items: IRoom[];
  itemCount: number;
  total: number;
  page: number;
}

export enum ROOM_STATUS {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
  NONE = 'none',
}


export const MEETINGROOMS_KEY = 'meetingrooms'