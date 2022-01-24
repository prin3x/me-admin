import axios from 'axios';
import { EDITOR_BODY } from './post.model';

export function _getAllNewsCategories() {
  return axios.get('/post-categories/').then((res) => res.data);
}

export function _makeNewsContent(_content) {
  let formData = new FormData();
  formData.append('categoryId', _content.categoryId);
  formData.append('title', _content.title);
  formData.append('content', _content.content);
  formData.append('status', _content.status);
  formData.append('type', _content.type);
  formData.append('image', _content.mainImage.originFileObj);

  const config = {
    url: `/posts`,
    data: formData,
  };
  return axios.post(config.url, config.data).then((res) => res.data);
}

export function _getRecentNews() {
  return axios.get('/posts').then((res) => res.data);
}

export function _getOnePost(_slug: string) {
  return axios.get(`/posts/${_slug}`).then((res) => res.data);
}

export function _updatePost(_slug, _content) {
  return axios
    .patch(`/posts/${_slug}`, { ..._content })
    .then((res) => res.data);
}

export function _deletePost(id: number) {
  return axios.delete(`posts/${id}`).then((res) => res.data);
}
