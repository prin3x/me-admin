import axios from "axios";
import {
  ADMIN_ROLES,
  ADMIN_STATUS,
  CreateAdminDto,
  IAdminJWT,
  UpdateAdminDto,
} from "./admin.model";
import jwt_decode from "jwt-decode";

export async function _loginAdmin(adminInfo) {
  return axios.post("/auth/admin/login", { ...adminInfo });
}

export function _getAdminList(queryString: string) {
  return axios.get(`/admins?${queryString}`).then((res) => res.data);
}

export function _createAdmin(createAdminDto: CreateAdminDto) {
  return axios.post("/admins", { ...createAdminDto }).then((res) => res.data);
}

export function _changeAdminStatus(id: string | number, status: ADMIN_STATUS) {
  return axios.patch(`/admins/${id}/status`, { status });
}

export function _removeAdmin(id: string | number) {
  return axios.delete(`/admins/${id}`);
}

export function _changeAdminRole(id: string | number, role: ADMIN_ROLES) {
  return axios.patch(`/admins/${id}`, { role });
}

export function _changeAdminNewPassword(id: string | number, password: string) {
  return axios.patch(`/admins/${id}`, { password });
}


export function validateAdminRole(): IAdminJWT {
  const token = localStorage.getItem("token");
  if(!token) return;
  const decoded = jwt_decode(token);

  return decoded as IAdminJWT;
}
