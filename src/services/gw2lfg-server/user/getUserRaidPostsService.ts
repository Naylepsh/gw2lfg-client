import { httpGet } from "../../http/getHttpService";
import { usersUrl } from "./getProfileService";
import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { RaidPostDTO } from "../entities/RaidPostDTO";
import { createPaginationQuery } from "../createPaginationQuery";
import { GetUserRaidPostsDTO } from "./dtos/GetUserRaidPostsDTO";

/* 
Sends GET /users/:id/raid-posts request to gw2lfg-server.
*/
export async function getUserRaidPosts(dto: GetUserRaidPostsDTO) {
  // Access token is optional,
  // but without it raid post's userMeetsRequirements property will be set to false
  const token = getAccessToken();
  const headers = createGw2lfgHeaders(token);

  const query = createPaginationQuery(dto.page);

  const { data, hasMore } = await httpGet<{
    data: RaidPostDTO[];
    hasMore: boolean;
  }>(`${usersUrl}/${dto.id}/raid-posts?${query}`, { headers });

  return { raidPosts: data, hasMore };
}
