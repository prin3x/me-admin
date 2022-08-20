import axios from "axios";

export function getFloors() {
  return axios.get("/floor").then((res) => res.data);
}

export function updateFloor(id, floorDto) {
  return axios
    .patch(`/floor/${id}`, { ...floorDto })
    .then((res) => res.data);
}

export function createFloor(floorDto) {
  return axios.post("/floor", { ...floorDto }).then((res) => res.data);
}

export function removeFloor(id) {
  return axios.delete(`/floor/${id}`).then((res) => res.data);
}
