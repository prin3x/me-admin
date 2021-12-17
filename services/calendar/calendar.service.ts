import axios from 'axios';
import { MakeNewsDto, UpdateNewsDto } from './calendar.model';

export function _findAllCalendarEvent() {
  return axios.get('/calendar-event').then((res) => res.data);
}
export function _getAllCategories() {
  return axios.get('/calendar-event-category').then((res) => res.data);
}

export function _makeNewEvent(_eventInfo: MakeNewsDto) {
  return axios
    .post('/calendar-event', { ..._eventInfo })
    .then((res) => res.data);
}

export function _updateEvent(id, eventInfo: UpdateNewsDto) {
  return axios
    .patch(`/calendar-event/${id}`, { ...eventInfo })
    .then((res) => res.data);
}

export function _deleteEvent(id) {
  return axios.delete(`/calendar-event/${id}`).then((res) => res.data);
}
