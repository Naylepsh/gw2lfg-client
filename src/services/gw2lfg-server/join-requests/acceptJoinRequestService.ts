import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { axiosHttpPostAdapter as axiosHttpPutAdapter } from "../../http/post/axiosHttpPostAdapter";
import { HttpPut } from "../../http/put/httpPutType";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { JoinRequestDTO } from "../entities/joinRequestDTO";
import { joinRequestsUrl } from "./constants";

export interface AcceptJoinRequestDTO {
  id: number;
}

/* 
Sends PUT /join-requests/:id request to gw2lfg-server with status set to 'ACCEPTED'
*/
export function acceptJoinRequest(httpPut: HttpPut) {
  return async function (dto: AcceptJoinRequestDTO) {
    const acceptJoinRequestUrl = `${joinRequestsUrl}/${dto.id}`;

    // Access token is required
    const token = getAccessToken();
    const headers = createGw2lfgHeaders(token);

    const { data } = await httpPut<
      { status: string },
      { data: JoinRequestDTO }
    >(acceptJoinRequestUrl, { status: "ACCEPTED" }, { headers });

    return data;
  };
}

/*
Function with axios adapter injected.
*/
export default acceptJoinRequest(axiosHttpPutAdapter);
