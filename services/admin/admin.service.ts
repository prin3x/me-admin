import axios from "axios";

export async function _loginAdmin(adminInfo) {
  return axios.post("/auth/admin/login", { ...adminInfo });
}
