import axios from 'axios';

export function _getAllNewsCategories() {
  return axios.get('/news-category/').then((res) => res.data);
}

export function _makeNewsContent(_content) {
  return axios.post('/news', { ..._content }).then((res) => res.data);
}

export function _getRecentNews() {
  return axios.get('/news').then((res) => res.data);
}

export function _updateContent(_contentInfo) {
  return axios.get('/news').then((res) => res.data);
}

