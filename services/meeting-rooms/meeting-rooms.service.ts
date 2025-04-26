import axios from "axios";
import { ICreateMeeting, IRoom, IRoomResponse, ROOM_STATUS } from "./meeting-room.model";
import * as queryString from "query-string";
import { ListQueryCalendarDTO } from "../calendar/calendar.model";

export async function _createBooking(_createEventInfo: ICreateMeeting) {
  return axios.post("/meeting-events/", { ..._createEventInfo });
}

export async function _getAllBookingEvents(q: ListQueryCalendarDTO) {
  const query = queryString.stringify(q);
  return axios.get(`/meeting-events/?${query}`).then((res) => res.data);
}

export async function _getBookingEventById(id: number) {
  return axios.get(`/meeting-events/${id}`).then((res) => res.data);
}

export async function _getAllRoomsAvb(_queryStr): Promise<IRoomResponse> {
  return axios.get(`/rooms/?${_queryStr}`).then((res) => res.data);
}

export async function _getAllRooms(_floor): Promise<IRoom[]> {
  return axios.get(`/rooms/${_floor}`).then((res) => res.data);
}

export async function _getRoomById(_id): Promise<IRoom> {
  return axios.get(`/rooms/${_id}`).then((res) => res.data);
}

export async function _removeRomById(_id): Promise<IRoom[]> {
  return axios.delete(`/rooms/${_id}`);
}

export async function _createRoom(params) {
  let formData = new FormData();
  formData.append("name", params.name);
  formData.append("floor", params.floor);
  formData.append("image", params.image.file);
  formData.append("description", params.description);
  formData.append("capacity", params.capacity);

  const config = {
    url: `/rooms`,
    data: formData,
  };
  return axios.post(config.url, config.data).then((res) => res.data);
}

export async function _updateRoom(params) {
  let formData = new FormData();
  formData.append("name", params.name);
  formData.append("floor", params.floor);
  formData.append("image", params.image?.file || params.image);
  formData.append("description", params.description);
  formData.append("capacity", params.capacity);
  formData.append("order", params.order);

  const config = {
    url: `/rooms/${params.id}`,
    data: formData,
  };
  return axios.patch(config.url, config.data).then((res) => res.data);
}

export async function _toggleRoomStatus(id: string, status: ROOM_STATUS) {
  return await axios.patch(`/rooms/${id}/status`, { status });
}

export async function _getAllRoomsById(_id) {
  return axios.get(`/rooms/${_id}`).then((res) => res.data);
}

export async function _getRoomByFloor(floor: string) {
  return axios.get(`/rooms/floor/${floor}`).then((res) => res.data);
}

export async function _updateMeetingEvent(
  id,
  _createEventInfo: ICreateMeeting
) {
  return axios.patch(`/meeting-events/${id}`, { ..._createEventInfo });
}

export async function _removeMeetingEvent(id) {
  return axios.delete(`/meeting-events/${id}`);
}
