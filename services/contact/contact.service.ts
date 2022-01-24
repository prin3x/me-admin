import axios from 'axios';

export function _getAllStaffContacts() {
  return axios.get('/staff-contacts/').then((res) => res.data);
}

export function _createNewStaffContact(_contactDto) {
  return axios
    .post('/staff-contacts/', { ..._contactDto })
    .then((res) => res.data);
}

export function _patchStaffContact(id, _contactDto) {
  return axios
    .patch(`/staff-contacts/${id}`, { ..._contactDto })
    .then((res) => res.data);
}
