import { usersUrl } from "./getProfileService";
import { GetUserRaidClearStatusDTO } from "./dtos/GetuserRaidClearStatusDTO";
import { HttpGet } from "../../http/get/httpGetType";
import { axiosHttpGetAdapter } from "../../http/get/axiosHttpGetAdapter";

/* 
Sends GET /users/:id/raid-clear request to gw2lfg-server
*/
export function getUserRaidClearStatus(httpGet: HttpGet) {
  return async function (dto: GetUserRaidClearStatusDTO) {
    const { data } = await httpGet<{ data: string[] }>(
      `${usersUrl}/${dto.id}/raid-clear`
    );

    return data;
  };
}

/*
Function with axios adapter injected.
*/
export default getUserRaidClearStatus(axiosHttpGetAdapter);
