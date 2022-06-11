export interface IServiceContactDetail {
  id: number;
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
  createdDate: Date;
  updatedDate: Date;
  serviceContactDetail: IServiceContactDetail[];
}
