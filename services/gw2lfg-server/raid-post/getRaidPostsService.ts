import { httpGet } from "../../http/getHttpService";
import { raidPostsUrl } from "./constants";

export interface UserDTO {
  id: number;
  username: string;
}

export interface RaidBossDTO {
  id: number;
  name: string;
  isCm: boolean;
}

export interface RequirementDTO {
  name: string;
}

export interface RoleDTO {
  name: string;
  class: string;
  description?: string;
}

export interface RaidPostDTO {
  id: number;
  date: Date;
  server: string;
  description?: string;
  author: UserDTO;
  bosses: RaidBossDTO[];
  requirements: RequirementDTO[];
  userMeetsRequirements: boolean;
  roles: RoleDTO[];
}

export interface GetRaidPostsDTO {
  page: number;
}

export const getRaidPostsUrl = raidPostsUrl;

export async function getRaidPosts(dto: GetRaidPostsDTO) {
  const resultsPerPage = 10;
  const take = resultsPerPage;
  const skip = Math.max(0, (dto.page - 1) * resultsPerPage);
  const raidPost = await httpGet<RaidPostDTO[]>(
    `${getRaidPostsUrl}?take=${take}&skip=${skip}`
  );
  return raidPost;
}
