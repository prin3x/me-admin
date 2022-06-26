import axios from "axios";

export function getTags() {
  return axios.get("/tags").then((res) => res.data);
}

export function updateTags(id, tagsDto) {
  return axios
    .patch(`/tags/${id}`, { ...tagsDto })
    .then((res) => res.data);
}

export function createTags(tagsDto) {
  return axios.post("/tags", { ...tagsDto }).then((res) => res.data);
}

export function removeTags(id) {
  return axios.delete(`/tags/${id}`).then((res) => res.data);
}
