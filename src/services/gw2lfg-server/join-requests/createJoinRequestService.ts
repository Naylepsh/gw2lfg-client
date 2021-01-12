import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { httpPost } from "../../http/postHttpService";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { JoinRequestDTO } from "../entities/joinRequestDTO";
import { joinRequestsUrl } from "./constants";

export interface CreateJoinRequestDTO {
  roleId: number;
  postId: number;
}

/* 
Sends POST /join-requests request to gw2lfg-server
*/
export async function createJoinRequest(dto: CreateJoinRequestDTO) {
  const createJoinRequestUrl = joinRequestsUrl;

  // Access token is required
  const token = getAccessToken();
  const headers = createGw2lfgHeaders(token);

  const { data, error } = await httpPost<
    CreateJoinRequestDTO,
    { data: JoinRequestDTO }
  >(createJoinRequestUrl, dto, { headers });

  return { data, error };
}
