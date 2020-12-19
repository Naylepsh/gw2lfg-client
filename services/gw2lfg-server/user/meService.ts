import { httpGet } from "../../http/getHttpService";
import { gw2lfgUrl } from "../constants";
import { UserDTO } from "../entities/UserDTO";

export const meUrl = `${gw2lfgUrl}/me`;

export function getMe() {
  return httpGet<UserDTO>(meUrl);
}
