import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { axiosHttpPostAdapter } from "../../http/post/axiosHttpPostAdapter";
import { HttpPost } from "../../http/post/httpPostType";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { RaidPostDTO } from "../entities/RaidPostDTO";
import { raidPostsUrl } from "./constants";
import { SaveRaidPostDTO } from "./dtos/SaveRaidPostDTO";

/* 
Sends POST /raid-posts request to gw2lfg-server
*/
export function createRaidPost(httpPost: HttpPost) {
  return async function (dto: SaveRaidPostDTO) {
    // Assign default values if dto is lacking following properties
    dto.rolesProps = dto.rolesProps ?? [];
    dto.requirementsProps.itemsProps = dto.requirementsProps.itemsProps ?? [];

    // Access token is required
    const token = getAccessToken();
    const headers = createGw2lfgHeaders(token);

    const { data, error } = await httpPost<
      SaveRaidPostDTO,
      { data: RaidPostDTO }
    >(createRaidPostUrl, dto, { headers });

    return { data: data?.data, error };
  };
}

/*
Function with axios adapter injected.
*/
export default createRaidPost(axiosHttpPostAdapter);

export const createRaidPostUrl = raidPostsUrl;
