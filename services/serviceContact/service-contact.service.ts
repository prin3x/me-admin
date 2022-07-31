import axios from "axios";
import {
  ICreateServiceContactCategory,
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

export function _createServiceContactCategory(categoryDto: ICreateServiceContactCategory) {
  return axios.post("/service-contact-category", { ...categoryDto });
}

export function _updateServiceContactCategory(
  categoryDto: IUpdateServiceContactCategory
) {
  return axios.patch(`/service-contact-category/${categoryDto.id}`, {
    ...categoryDto,
  });
}

export function _removeContactServiceCategory(id: string) {
  return axios.delete(`/service-contact-category/${id}`);
}

export function _alterItemIndex(id: string, index: number) {
  return axios.patch(`/service-contact/index/${id}/${index}`);
}

export function _alterCategoryIndex(id: string, index: number) {
  return axios.patch(`/service-contact-category/index/${id}/${index}`);
}
