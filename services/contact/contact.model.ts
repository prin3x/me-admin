export enum ContactStatus {
  ENABLED = "enabled",
  DISABLED = "disabled",
  NONE = "none",
}

export interface IContact {
  id: number;
  profilePicFile: any;
  name: string;
  nickname: string;
  company: string;
  department: string;
  division?: string;
  section: string;
  ipPhone: string;
  email: string;
  position: string;
  staffId?: string | number;
  nameTH: string;
  status: string;
  birthDate: string;
  createdBy: number;
  createdDate: string;
  updatedDate: string;
}

export interface ListQueryParams {
  page?: number;

  limit?: number;

  orderBy?: string;

  order?: string;

  search?: string;

  department?: string;

  company?: string;
}

export interface ListQueryParamsBirthday extends ListQueryParams {
  startDate: Date | string;
  endDate: Date | string;
}

export enum EDepartment {
  MD = "MD",
  MARKETING = "Marketing",
  OPERATION = "Operation",
  FINANCE_ACCOUNT = "Finance & Accounting",
  SHUUSHABU = "Shuushabu",
  BD = "Business Development",
  CALLCENTER = "Call Center",
  CARECALL = "Care Call",
  COMPLAINT = "Complaint",
  DIGITAL = "Digital",
  HR = "Human Resource",
  ITB = "International Business Development",
  NSC = "Nutritionist Social Care",
  RECRUITMENT = "Recruitment",
  SLBA = "Social Listening & Brand Advocacy",
}

export enum ECompanyList {
  MI = "Mindedge Innovation",
  MR = "Mindedge Recruitment",
  FB = "Foodberg",
  MY = "Me and You Entertainment",
}

export const DEPT_SELECTOR = [
  EDepartment.BD,
  EDepartment.CALLCENTER,
  EDepartment.CARECALL,
  EDepartment.COMPLAINT,
  EDepartment.DIGITAL,
  EDepartment.FINANCE_ACCOUNT,
  EDepartment.HR,
  EDepartment.ITB,
  EDepartment.MARKETING,
  EDepartment.MD,
  EDepartment.NSC,
  EDepartment.OPERATION,
  EDepartment.RECRUITMENT,
  EDepartment.SHUUSHABU,
  EDepartment.SLBA,
];

export const COMPANY_SELECTOR = [
  ECompanyList.FB,
  ECompanyList.MI,
  ECompanyList.MR,
  ECompanyList.MY,
];

export interface CreateStaffDTO {
  profilePicFile: any;

  profilePicUrl: any;

  name: string;

  nickname: string;

  company: string;

  department: string;

  division: string;

  ipPhone: string;

  email: string;

  status?: CONTACT_STATUS;

  birthDate: string | Date;

  hash: string;

  nameTH: string;

  staffId: string;

  section: string;

  position: string;
}


export enum CONTACT_STATUS {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
  NONE = 'none',
}