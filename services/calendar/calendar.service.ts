import axios from "axios";
import {
  ListCalendarDTO,
  ListQueryCalendarDTO,
  MakeNewsDto,
  UpdateNewsDto,
} from "./calendar.model";

export function _findAllCalendarEvent(q: ListQueryCalendarDTO) {
  return axios
    .get(`/calendar-event?startDate=${q.startDate}&endDate=${q.endDate}`)
    .then((res) => res.data);
}
export function _getAllCategories() {
  return axios.get("/calendar-event-category").then((res) => res.data);
}

export function _getCalendarList(queryStr: string) {
  return axios.get(`/calendar-event/list?${queryStr}`).then((res) => res.data);
}

export function _makeNewEvent(_eventInfo: MakeNewsDto) {
  return axios
    .post("/calendar-event", { ..._eventInfo })
    .then((res) => res.data);
}

export function _updateEvent(id, eventInfo: UpdateNewsDto) {
  return axios
    .patch(`/calendar-event/${id}`, { ...eventInfo })
    .then((res) => res.data);
}

export function _deleteEvent(id: number | string) {
  return axios.delete(`/calendar-event/${id}`).then((res) => res.data);
}
