import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { httpDelete } from "../../http/deleteHttpService";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { raidPostsUrl } from "./constants";
import { DeleteRaidPostDTO } from "./dtos/DeleteRaidPostDTO";

// Sends DELETE /raid-posts/:id request to gw2lfg-server
export async function deleteRaidPost(dto: DeleteRaidPostDTO) {
  // Access token is required
  const token = getAccessToken();
  const headers = createGw2lfgHeaders(token);

  const { data, error } = await httpDelete<{}>(
    `${createRaidPostUrl}/${dto.id}`,
    { headers }
  );

  return { data, error };
}

export const createRaidPostUrl = raidPostsUrl;
