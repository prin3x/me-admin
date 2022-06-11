import axios from "axios";
import { IServiceContact } from "./service-contact.model";

export async function _getContactServiceList(): Promise<IServiceContact[]> {
  return axios.get("/service-contact").then((res) => res.data);
}
