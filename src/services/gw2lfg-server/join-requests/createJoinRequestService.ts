import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { httpPost } from "../../http/postHttpService";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { JoinRequestDTO } from "../entities/joinRequestDTO";
import { joinRequestsUrl } from "./constants";

export interface CreateJoinRequestDTO {
  roleId: number;
  postId: number;
}

export async function createJoinRequest(dto: CreateJoinRequestDTO) {
  const createJoinRequestUrl = joinRequestsUrl;

  const token = getAccessToken();
  const headers = createGw2lfgHeaders(token);

  const { data } = await httpPost<
    CreateJoinRequestDTO,
    { data: JoinRequestDTO }
  >(createJoinRequestUrl, dto, { headers });

  return data;
}
