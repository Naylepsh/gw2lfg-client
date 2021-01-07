import { httpGet } from "../../http/getHttpService";
import { raidPostsUrl } from "./constants";
import { RaidPostDTO } from "../entities/RaidPostDTO";
import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";

export interface GetRaidPostDTO {
  id: string;
}

export async function getRaidPost(dto: GetRaidPostDTO) {
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
