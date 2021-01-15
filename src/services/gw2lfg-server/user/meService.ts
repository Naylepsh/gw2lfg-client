import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { gw2lfgUrl } from "../constants";
import { UserDTO } from "../entities/UserDTO";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { HttpGet } from "../../http/get/httpGetType";
import { axiosHttpGetAdapter } from "../../http/get/axiosHttpGetAdapter";

/* 
Sends GET /me request to gw2lfg-server
*/
export function getMe(httpGet: HttpGet) {
  return async function () {
    // Access token is required
    const token = getAccessToken();
    const headers = createGw2lfgHeaders(token);

    const { data } = await httpGet<{ data: UserDTO }>(meUrl, { headers });

    return data;
  };
}

/*
Function with axios adapter injected.
*/
export default getMe(axiosHttpGetAdapter);

export const meUrl = `${gw2lfgUrl}/me`;
