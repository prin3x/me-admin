import axios from "axios";
import { IContact } from "../contact/contact.model";

/**
 * Set the token to local storage
 * @param _token - The token to be stored in localStorage.
 */
export function setTokenToStorage(_token) {
  localStorage.setItem("token", _token);
}

export function getAuthToken(): string {
  return localStorage.getItem("token");
}

export function clearToken() {
  return localStorage.removeItem("token");
}

export async function checkAuth(): Promise<IContact> {
  return await axios.get("/auth/checkauth").then((res) => res.data);
}
