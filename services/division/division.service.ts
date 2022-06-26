import axios from "axios";

export function getDivisions() {
  return axios.get("/division").then((res) => res.data);
}

export function updateDivisions(id, divisionDto) {
  return axios
    .patch(`/division/${id}`, { ...divisionDto })
    .then((res) => res.data);
}

export function createDivisions(divisionDto) {
  return axios.post("/division", { ...divisionDto }).then((res) => res.data);
}

export function removeDivisions(id) {
  return axios.delete(`/division/${id}`).then((res) => res.data);
}
