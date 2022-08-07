import axios from "axios";
import {
  ICreateFormsRequestCategory,
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
  let formData = new FormData();
  formData.append("downloadLink", updatedItem.downloadLink || "");
  formData.append("content", updatedItem.content);
  formData.append(
    "file",
    updatedItem?.file && updatedItem.file.file.originFileObj
  );

  const config = {
    url: `/forms-request/${updatedItem.id}`,
    data: formData,
  };
  return axios.patch(config.url, config.data).then((res) => res.data);
}

export function _removeFormsRequest(id: string) {
  return axios.delete(`/forms-request/${id}`);
}

export function _createFormsRequestCategory(
  createdDTO: ICreateFormsRequestCategory
) {
  return axios.post("/forms-request-category", { ...createdDTO });
}

export function _updateFormsRequestCategory(
  createdDTO: IUpdateFormsRequestCategory
) {
  return axios.patch(`/forms-request-category/${createdDTO.id}`, {
    ...createdDTO,
  });
}

export function _removeFormsRequestCategory(id: string) {
  return axios.delete(`/forms-request-category/${id}`);
}

export function _alterItemIndex(id: string, index: number) {
  return axios.patch(`/forms-request/index/${id}/${index}`);
}

export function _alterCategoryIndex(id: string, index: number) {
  return axios.patch(`/forms-request-category/index/${id}/${index}`);
}
