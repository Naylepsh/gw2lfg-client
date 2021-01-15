import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { axiosHttpDeleteAdapter } from "../../http/delete/axiosHttpDeleteAdapter";
import { HttpDelete } from "../../http/delete/httpDeleteType";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { raidPostsUrl } from "./constants";
import { DeleteRaidPostDTO } from "./dtos/DeleteRaidPostDTO";

/* 
Sends DELETE /raid-posts/:id request to gw2lfg-server
*/
export function deleteRaidPost(httpDelete: HttpDelete) {
  return async function (dto: DeleteRaidPostDTO) {
    // Access token is required
    const token = getAccessToken();
    const headers = createGw2lfgHeaders(token);

    const { data, error } = await httpDelete<{}>(
      `${createRaidPostUrl}/${dto.id}`,
      { headers }
    );

    return { data, error };
  };
}

/*
Function with axios adapter injected.
*/
export default deleteRaidPost(axiosHttpDeleteAdapter);

export const createRaidPostUrl = raidPostsUrl;
