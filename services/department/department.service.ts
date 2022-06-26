import axios from "axios";

export function getDepartments() {
  return axios.get("/department").then((res) => res.data);
}

export function updateDepartments(id, departmentDto) {
  return axios
    .patch(`/department/${id}`, { ...departmentDto })
    .then((res) => res.data);
}

export function createDepartments(departmentDto) {
  return axios.post("/department", { ...departmentDto }).then((res) => res.data);
}

export function removeDepartments(id) {
  return axios.delete(`/department/${id}`).then((res) => res.data);
}
