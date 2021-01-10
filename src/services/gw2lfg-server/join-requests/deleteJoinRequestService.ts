import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { httpDelete } from "../../http/deleteHttpService";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { joinRequestsUrl } from "./constants";

export interface DeleteJoinRequestDTO {
  id: number;
}

/* 
Sends DELETE /join-requests/:id request to gw2lfg-server
*/
export async function deleteJoinRequest(dto: DeleteJoinRequestDTO) {
  const deleteJoinRequestUrl = `${joinRequestsUrl}/${dto.id}`;

  // Access token is required
  const token = getAccessToken();
  const headers = createGw2lfgHeaders(token);

  const { data } = await httpDelete<{}>(deleteJoinRequestUrl, { headers });

  return data;
}
