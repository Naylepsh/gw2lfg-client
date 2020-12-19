import { httpGet } from "../../http/getHttpService";
import { raidPostsUrl } from "./constants";
import { RaidPostDTO } from "../entities/RaidPostDTO";
import { getAccessToken } from "../../../utils/auth/auth";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";

export interface GetRaidPostsDTO {
  page: number;
}

export const getRaidPostsUrl = raidPostsUrl;

export async function getRaidPosts(dto: GetRaidPostsDTO) {
  const token = getAccessToken();
  const headers = createGw2lfgHeaders(token);

  const resultsPerPage = 10;
  const take = resultsPerPage;
  const skip = Math.max(0, (dto.page - 1) * resultsPerPage);
  const raidPosts = await httpGet<RaidPostDTO[]>(
    `${getRaidPostsUrl}?take=${take}&skip=${skip}`,
    { headers }
  );
  console.log({ raidPosts });
  return raidPosts;
}
