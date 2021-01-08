import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { httpDelete } from "../../http/deleteHttpService";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { raidPostsUrl } from "./constants";

interface DeleteRaidPostDTO {
  id: number;
}

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
