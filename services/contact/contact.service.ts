import axios from "axios";

export function _getAllStaffContacts(_queryStr) {
  return axios.get(`/staff-contacts?${_queryStr}`).then((res) => res.data);
}

export function _getAllStaffOptions() {
  return axios.get(`/staff-contacts/options`).then((res) => res.data);
}

export function _createNewStaffContact(_contactDto) {
  let formData = new FormData();
  formData.append("name", _contactDto.name);
  formData.append("company", _contactDto.company);
  formData.append("nickname", _contactDto.nickname);
  formData.append("department", _contactDto.department);
  formData.append("division", _contactDto.division);
  formData.append("ipPhone", _contactDto.ipPhone);
  formData.append("email", _contactDto.email);
  formData.append("birthDate", _contactDto.birthDate);
  formData.append("image", _contactDto?.profilePicUrl?.originFileObj);

  const config = {
    url: `/staff-contacts/`,
    data: formData,
  };
  return axios.post(config.url, config.data).then((res) => res.data);
}

export function _patchStaffContact(id, _contactDto) {
  return axios
    .patch(`/staff-contacts/${id}`, { ..._contactDto })
    .then((res) => res.data);
}

export function _removeStaffContact(id) {
  return axios.delete(`/staff-contacts/${id}`).then((res) => res.data);
}
