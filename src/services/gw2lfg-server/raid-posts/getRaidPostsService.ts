import { httpGet } from "../../http/getHttpService";
import { raidPostsUrl } from "./constants";
import { RaidPostDTO } from "../entities/RaidPostDTO";
import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";

export interface GetRaidPostsDTO {
  page: number;
}

// sends GET /raid-posts request to gw2lfg-server
export async function getRaidPosts(dto: GetRaidPostsDTO) {
  // Access token is optional,
  // but without it all raid posts's userMeetsRequirements property will be set to false
  const token = getAccessToken();
  const headers = createGw2lfgHeaders(token);

  const query = createPaginationQuery(dto);
  const url = `${getRaidPostsUrl}?${query}`;

  const { data: raidPosts, hasMore } = await httpGet<{
    data: RaidPostDTO[];
    hasMore: boolean;
  }>(url, { headers });

  return { raidPosts, hasMore };
}

function createPaginationQuery(dto: GetRaidPostsDTO) {
  const resultsPerPage = 10;

  const take = resultsPerPage;
  const skip = Math.max(0, (dto.page - 1) * resultsPerPage);
  const query = `take=${take}&skip=${skip}`;

  return query;
}

export const getRaidPostsUrl = raidPostsUrl;
