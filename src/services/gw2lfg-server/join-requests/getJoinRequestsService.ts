import { axiosHttpGetAdapter } from "../../http/get/axiosHttpGetAdapter";
import { HttpGet } from "../../http/get/httpGetType";
import { JoinRequestDTO } from "../entities/joinRequestDTO";
import { joinRequestsUrl } from "./constants";

export interface GetJoinRequestsQueryParams {
  userId?: number;
  roleId?: number;
  postId?: number;
}

/* 
Sends GET /join-requests request to server
*/
export function getJoinRequests(httpGet: HttpGet) {
  return async function (queryParams: GetJoinRequestsQueryParams) {
    const { data } = await httpGet<{ data: JoinRequestDTO[] }>(
      toUrl(queryParams)
    );

    return data;
  };
}

function toUrl({ userId, roleId, postId }: GetJoinRequestsQueryParams) {
  const createJoinRequestUrl = joinRequestsUrl;
  const query = createUrlQuery(userId, roleId, postId);

  return `${createJoinRequestUrl}?${query}`;
}

function createUrlQuery(userId: number, roleId: number, postId: number) {
  const userQueryParam = userId ? `userId=${userId}` : undefined;
  const roleQueryParam = roleId ? `roleId=${roleId}` : undefined;
  const postQueryParam = postId ? `postId=${postId}` : undefined;

  const queryParams = removeUndefinedParams(
    userQueryParam,
    roleQueryParam,
    postQueryParam
  );
  const query = queryParams.join("&");

  return query;
}

function removeUndefinedParams(
  userQueryParam: string,
  roleQueryParam: string,
  postQueryParam: string
) {
  return [userQueryParam, roleQueryParam, postQueryParam].filter((qp) => !!qp);
}

/*
Function with axios adapter injected.
*/
export default getJoinRequests(axiosHttpGetAdapter);
