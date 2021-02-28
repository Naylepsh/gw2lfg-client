import { usersUrl } from "./getProfileService";
import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { RaidPostDTO } from "../entities/RaidPostDTO";
import { createPaginationQuery } from "../createPaginationQuery";
import { GetUserRaidPostsDTO } from "./dtos/GetUserRaidPostsDTO";
import { HttpGet } from "../../http/get/httpGetType";
import { axiosHttpGetAdapter } from "../../http/get/axiosHttpGetAdapter";

/**
 * Sends GET /users/:id/raid-posts request to gw2lfg-server.
 */
export function getUserRaidPosts(httpGet: HttpGet) {
  return async function (dto: GetUserRaidPostsDTO) {
    /**
     * Access token is optional,
     * but without it raid post's userMeetsRequirements property will be set to false
     */
    const token = getAccessToken();
    const headers = createGw2lfgHeaders(token);

    const query = createPaginationQuery(dto.page);

    const { data, hasMore } = await httpGet<{
      data: RaidPostDTO[];
      hasMore: boolean;
    }>(`${usersUrl}/${dto.id}/raid-posts?${query}`, { headers });

    return { raidPosts: data, hasMore };
  };
}

/**
 * Function with axios adapter injected.
 */
export default getUserRaidPosts(axiosHttpGetAdapter);
