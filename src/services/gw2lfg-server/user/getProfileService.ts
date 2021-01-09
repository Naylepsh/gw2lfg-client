import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { httpGet } from "../../http/getHttpService";
import { gw2lfgUrl } from "../constants";
import { UserProfileDTO } from "../entities/UserProfileDTO";
import { GetUserProfileDTO } from "./dtos/GetUserProfileDTO";

/* 
Sends GET /users/:id request to gw2lfg-server
*/
export async function getUserProfile(dto: GetUserProfileDTO) {
  const { data } = await httpGet<{ data: UserProfileDTO }>(
    `${usersUrl}/${dto.id}`
  );

  return data;
}

export const usersUrl = `${gw2lfgUrl}/users`;
