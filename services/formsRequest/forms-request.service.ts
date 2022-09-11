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
  let formData = new FormData();
  formData.append("downloadLink", createItem.downloadLink || "");
  formData.append("content", createItem.content);
  formData.append("categoryId", createItem.categoryId);
  formData.append("index", createItem.index.toString());
  formData.append(
    "file",
    createItem?.file && createItem.file.file
  );

  const config = {
    url: `/forms-request`,
    data: formData,
  };
  return axios.post(config.url, config.data).then((res) => res.data);
}

export function _updateFormsRequestListItem(
  updatedItem: IUpdateFormsRequestItem
) {
  console.log(updatedItem,'updatedItem')
  let formData = new FormData();
  formData.append("downloadLink", updatedItem.downloadLink || "");
  formData.append("content", updatedItem.content);
  formData.append(
    "file",
    updatedItem?.file && updatedItem.file.file
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
