export interface ICarousel {
  id: number;

  imageUrl: string;

  title: string;

  linkOut: string;

  status: CAROUSEL_STATUS;

  adminId: number;

  createdDate: Date;

  updatedDate: Date;
}

export interface ICarouselResponse {
  items: ICarousel[];
  itemCount: number;
  total: number;
  page: number;
}

export enum CAROUSEL_STATUS {
  ENABLED = "enabled",
  DISABLED = "disabled",
  NONE = "none",
}

export const CAROUSEL_KEY = "carousel-all";
