import { httpGet } from "../../http/getHttpService";
import { usersUrl } from "./getProfileService";
import { GetuserRaidClearStatusDTO } from "./dtos/GetuserRaidClearStatusDTO";

/* 
Sends GET /users/:id/raid-clear request to gw2lfg-server
*/
export async function getUserRaidClearStatus(dto: GetuserRaidClearStatusDTO) {
  const { data } = await httpGet<{ data: string[] }>(
    `${usersUrl}/${dto.id}/raid-clear`
  );

  return data;
}
