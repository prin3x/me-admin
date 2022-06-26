import axios from "axios";
import { EDITOR_BODY } from "./post.model";

export function _getAllNewsCategories() {
  return axios.get("/post-categories/").then((res) => res.data);
}

export function _makeNewsContent(_content) {
  let formData = new FormData();
  formData.append("categoryName", _content.categoryName);
  formData.append("title", _content.title);
  formData.append("content", _content.content);
  formData.append("status", _content.status);
  formData.append("type", _content.type);
  formData.append("postBy", _content.postBy);
  formData.append("image", _content.mainImage.file);
  formData.append("homeImage", _content.homeImage.file);
  formData.append("tag", _content.tag);

  const config = {
    url: `/posts`,
    data: formData,
  };
  return axios.post(config.url, config.data).then((res) => res.data);
}

export function _getRecentNews(_queryStr) {
  return axios.get(`/posts/all?${_queryStr}`).then((res) => res.data);
}

export function _getOnePost(_slug: string) {
  return axios.get(`/posts/${_slug}`).then((res) => res.data);
}

export function _updatePost(_slug, _content) {
  let formData = new FormData();
  formData.append("categoryName", _content.categoryName);
  formData.append("title", _content.title);
  formData.append("content", _content.content);
  formData.append("status", _content.status);
  formData.append("type", _content.type);
  formData.append("postBy", _content.postBy);
  formData.append("image", "");
  formData.append("homeImage", "");
  if (_content.mainImage) {
    formData.append("image", _content.mainImage.file);
  }
  if (_content.homeImage) {
    formData.append("homeImage", _content.homeImage.file);
  }
  formData.append("tag", _content.tag);

  const config = {
    url: `/posts/${_slug}`,
    data: formData,
  };
  return axios.patch(config.url, config.data).then((res) => res.data);
}

export function _toggleStatus(_id, status) {
  return axios
    .patch(`/posts/${_id}/status`, { status })
    .then((res) => res.data);
}

export function _deletePost(id: string) {
  return axios.delete(`posts/${id}`).then((res) => res.data);
}
