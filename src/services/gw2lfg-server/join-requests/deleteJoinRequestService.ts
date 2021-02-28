import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { axiosHttpDeleteAdapter } from "../../http/delete/axiosHttpDeleteAdapter";
import { HttpDelete } from "../../http/delete/httpDeleteType";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { joinRequestsUrl } from "./constants";

export interface DeleteJoinRequestDTO {
  id: number;
}

/**
 * Sends DELETE /join-requests/:id request to gw2lfg-server
 */
export function deleteJoinRequest(httpDelete: HttpDelete) {
  return async function (dto: DeleteJoinRequestDTO) {
    const deleteJoinRequestUrl = `${joinRequestsUrl}/${dto.id}`;

    // Access token is required
    const token = getAccessToken();
    const headers = createGw2lfgHeaders(token);

    const { data } = await httpDelete<{}>(deleteJoinRequestUrl, { headers });

    return data;
  };
}

/**
 * Function with axios adapter injected.
 */
export default deleteJoinRequest(axiosHttpDeleteAdapter);
