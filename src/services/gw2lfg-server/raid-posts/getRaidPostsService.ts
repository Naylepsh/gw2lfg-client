import { httpGet } from "../../http/getHttpService";
import { raidPostsUrl } from "./constants";
import { RaidPostDTO } from "../entities/RaidPostDTO";
import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { GetRaidPostsDTO } from "./dtos/GetRaidPostsDTO";
import { createPaginationQuery } from "../createPaginationQuery";

/* 
Sends GET /raid-posts request to gw2lfg-server
*/
export async function getRaidPosts(dto: GetRaidPostsDTO) {
  // Access token is optional,
  // but without it all raid posts's userMeetsRequirements property will be set to false
  const token = getAccessToken();
  const headers = createGw2lfgHeaders(token);

  const query = createPaginationQuery(dto.page);
  const url = `${getRaidPostsUrl}?${query}`;

  const { data: raidPosts, hasMore } = await httpGet<{
    data: RaidPostDTO[];
    hasMore: boolean;
  }>(url, { headers });

  return { raidPosts, hasMore };
}

export const getRaidPostsUrl = raidPostsUrl;
