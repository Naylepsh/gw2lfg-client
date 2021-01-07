import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { httpGet } from "../../http/getHttpService";
import { gw2lfgUrl } from "../constants";
import { UserDTO } from "../entities/UserDTO";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";

// sends GET /me request to gw2lfg-server
export async function getMe() {
  // Access token is required
  const token = getAccessToken();
  const headers = createGw2lfgHeaders(token);

  const { data } = await httpGet<{ data: UserDTO }>(meUrl, { headers });

  return data;
}

export const meUrl = `${gw2lfgUrl}/me`;
