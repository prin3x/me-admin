import axios from "axios";
import { CreateStaffDTO } from "./contact.model";

export function _getAllStaffContacts(_queryStr) {
  return axios.get(`/staff-contacts?${_queryStr}`).then((res) => res.data);
}

export function _getAllStaffOptions() {
  return axios.get(`/staff-contacts/options`).then((res) => res.data);
}

export function _createNewStaffContact(_contactDto: CreateStaffDTO) {
  let formData = new FormData();
  formData.append("name", _contactDto.name);
  formData.append("nameTH", _contactDto.nameTH);
  formData.append("company", _contactDto.company);
  formData.append("nickname", _contactDto.nickname);
  formData.append("position", _contactDto.position);
  formData.append("staffId", _contactDto.staffId);
  formData.append("department", _contactDto.department);
  formData.append("division", _contactDto.division);
  formData.append("ipPhone", _contactDto.ipPhone);
  formData.append("email", _contactDto.email);
  formData.append("birthDate", _contactDto.birthDate);
  formData.append("image", _contactDto?.profilePicFile);

  const config = {
    url: `/staff-contacts/`,
    data: formData,
  };
  return axios.post(config.url, config.data).then((res) => res.data);
}

export function _patchStaffContact(id, _contactDto) {
  let formData = new FormData();
  formData.append("name", _contactDto.name);
  formData.append("nameTH", _contactDto.nameTH);
  formData.append("company", _contactDto.company);
  formData.append("nickname", _contactDto.nickname);
  formData.append("position", _contactDto.position);
  formData.append("staffId", _contactDto.staffId);
  formData.append("department", _contactDto.department);
  formData.append("division", _contactDto.division);
  formData.append("ipPhone", _contactDto.ipPhone);
  formData.append("email", _contactDto.email);
  formData.append("birthDate", _contactDto.birthDate);
  formData.append("image", _contactDto?.profilePicFile);

  const config = {
    url: `/staff-contacts/${id}`,
    data: formData,
  };
  return axios.patch(config.url, config.data).then((res) => res.data);
}

export function _removeStaffContact(id) {
  return axios.delete(`/staff-contacts/${id}`).then((res) => res.data);
}
