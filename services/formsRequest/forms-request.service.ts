import axios from "axios";
import {
  ICreateFormsRequestItem,
  IFormsRequest,
  IUpdateFormsRequestCategory,
  IUpdateFormsRequestItem,
} from "./forms-request.model";

export function _getFormRequestContent(): Promise<IFormsRequest[]> {
  return axios.get("/forms-request").then((res) => res.data);
}

export function _createFormsRequestListItem(
  createItem: ICreateFormsRequestItem
): Promise<IFormsRequest> {
  return axios
    .post("/forms-request", { ...createItem })
    .then((res) => res.data);
}

export function _updateFormsRequestListItem(
  updatedItem: IUpdateFormsRequestItem
) {
  return axios.patch(`/forms-request/${updatedItem.id}`, {
    ...updatedItem,
  });
}

export function _removeFormsRequest(id: string) {
  return axios.delete(`/forms-request/${id}`);
}

export function _createFormsRequestCategory(categoryTitle: string) {
  return axios.post("/forms-request-category", { title: categoryTitle });
}

export function _updateFormsRequestCategory(
  categoryTitle: IUpdateFormsRequestCategory
) {
  return axios.patch(`/forms-request-category/${categoryTitle.id}`, {
    title: categoryTitle.title,
  });
}

export function _removeFormsRequestCategory(id: string) {
  return axios.delete(`/forms-request-category/${id}`);
}
