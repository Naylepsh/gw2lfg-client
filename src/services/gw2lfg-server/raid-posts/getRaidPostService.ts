import { raidPostsUrl } from "./constants";
import { RaidPostDTO } from "../entities/RaidPostDTO";
import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { GetRaidPostDTO } from "./dtos/GetRaidPostDTO";
import { HttpGet } from "../../http/get/httpGetType";
import { axiosHttpGetAdapter } from "../../http/get/axiosHttpGetAdapter";

/* 
Sends GET /raid-posts/:id request to gw2lfg-server
*/
export function getRaidPost(httpGet: HttpGet) {
  return async function (dto: GetRaidPostDTO) {
    // Access token is optional,
    // but without it raid post's userMeetsRequirements property will be set to false
    const token = getAccessToken();
    const headers = createGw2lfgHeaders(token);

    const { data } = await httpGet<{
      data: RaidPostDTO;
      hasMore: boolean;
    }>(getRaidPostUrl(dto.id), { headers });

    return data;
  };
}

/*
Function with axios adapter injected.
*/
export default getRaidPost(axiosHttpGetAdapter)

export const getRaidPostUrl = (id: string) => {
  return `${raidPostsUrl}/${id}`;
};
