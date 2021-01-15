import { axiosHttpGetAdapter } from "../../http/get/axiosHttpGetAdapter";
import { HttpGet } from "../../http/get/httpGetType";
import { gw2lfgUrl } from "../constants";
import { UserProfileDTO } from "../entities/UserProfileDTO";
import { GetUserProfileDTO } from "./dtos/GetUserProfileDTO";

/* 
Sends GET /users/:id request to gw2lfg-server
*/
export function getUserProfile(httpGet: HttpGet) {
  return async function (dto: GetUserProfileDTO) {
    const { data } = await httpGet<{ data: UserProfileDTO }>(
      `${usersUrl}/${dto.id}`
    );

    return data;
  };
}

/*
Function with axios adapter injected.
*/
export default getUserProfile(axiosHttpGetAdapter);

export const usersUrl = `${gw2lfgUrl}/users`;
