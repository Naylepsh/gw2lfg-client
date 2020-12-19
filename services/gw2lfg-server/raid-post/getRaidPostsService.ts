import { httpGet } from "../../http/getHttpService";
import { raidPostsUrl } from "./constants";
import { RaidPostDTO } from "../entities/RaidPostDTO";

export interface GetRaidPostsDTO {
  page: number;
}

export const getRaidPostsUrl = raidPostsUrl;

export async function getRaidPosts(dto: GetRaidPostsDTO) {
  const resultsPerPage = 10;
  const take = resultsPerPage;
  const skip = Math.max(0, (dto.page - 1) * resultsPerPage);
  const raidPosts = await httpGet<RaidPostDTO[]>(
    `${getRaidPostsUrl}?take=${take}&skip=${skip}`
  );
  return raidPosts;
}
