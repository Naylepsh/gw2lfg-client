import { getAccessToken } from "../../../utils/auth/auth";
import { httpGet } from "../../http/getHttpService";
import { gw2lfgUrl } from "../constants";
import { UserDTO } from "../entities/UserDTO";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";

export const meUrl = `${gw2lfgUrl}/me`;

export function getMe() {
  const token = getAccessToken();
  const headers = createGw2lfgHeaders(token);
  return httpGet<UserDTO>(meUrl, { headers });
}
