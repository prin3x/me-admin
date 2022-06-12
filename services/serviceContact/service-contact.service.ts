import axios from "axios";
import {
  ICreateServiceContactItem,
  IServiceContact,
  IUpdateServiceContactCategory,
  IUpdateServiceContactItem,
} from "./service-contact.model";

export function _getContactServiceList(): Promise<IServiceContact[]> {
  return axios.get("/service-contact").then((res) => res.data);
}

export function _createContactServiceListItem(
  createItem: ICreateServiceContactItem
): Promise<IServiceContact> {
  return axios
    .post("/service-contact", { ...createItem })
    .then((res) => res.data);
}

export function _updateContactServiceListItem(
  updatedItem: IUpdateServiceContactItem
) {
  return axios.patch(`/service-contact/${updatedItem.id}`, {
    ...updatedItem,
  });
}

export function _removeContactService(id: string) {
  return axios.delete(`/service-contact/${id}`);
}

export function _createServiceContactCategory(categoryTitle: string) {
  return axios.post("/service-contact-category", { title: categoryTitle });
}

export function _updateServiceContactCategory(
  categoryTitle: IUpdateServiceContactCategory
) {
  return axios.patch(`/service-contact-category/${categoryTitle.id}`, {
    title: categoryTitle.title,
  });
}

export function _removeContactServiceCategory(id: string) {
  return axios.delete(`/service-contact-category/${id}`);
}
