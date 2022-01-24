export enum ContactStatus {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
  NONE = 'none',
}


export interface StaffContact {
  id: number;

  profilePicUrl: string;

  name: string;

  nickname: string;

  company: string;

  department: string;

  division: string;

  ipPhone: string;

  email: string;

  status: ContactStatus;

  birthDate: string;
}
