import { httpGet } from "../../http/getHttpService";
import { raidPostsUrl } from "./constants";
import { RaidPostDTO } from "../entities/RaidPostDTO";
import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { GetRaidPostDTO } from "./dtos/GetRaidPostDTO";

// Sends GET /raid-posts/:id request to gw2lfg-server
export async function getRaidPost(dto: GetRaidPostDTO) {
  // Access token is optional,
  // but without it raid post's userMeetsRequirements property will be set to false
  const token = getAccessToken();
  const headers = createGw2lfgHeaders(token);

  const { data } = await httpGet<{
    data: RaidPostDTO;
    hasMore: boolean;
  }>(getRaidPostUrl(dto.id), { headers });

  return data;
}

export const getRaidPostUrl = (id: string) => {
  return `${raidPostsUrl}/${id}`;
};
