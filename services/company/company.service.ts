import axios from "axios";

export function getCompany() {
  return axios.get("/company").then((res) => res.data);
}

export function updateCompany(id, companyDto) {
  return axios
    .patch(`/company/${id}`, { ...companyDto })
    .then((res) => res.data);
}

export function createCompany(companyDto) {
  return axios.post("/company", { ...companyDto }).then((res) => res.data);
}

export function removeCompany(id) {
  return axios.delete(`/company/${id}`).then((res) => res.data);
}
