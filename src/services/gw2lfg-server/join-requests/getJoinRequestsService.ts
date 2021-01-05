import { httpGet } from "../../http/getHttpService";
import { JoinRequestDTO } from "../entities/joinRequestDTO";
import { joinRequestsUrl } from "./constants";

export interface GetJoinRequestsQueryParams {
  userId?: number;
  roleId?: number;
  postId?: number;
}

export async function getJoinRequests(queryParams: GetJoinRequestsQueryParams) {
  const { data } = await httpGet<{ data: JoinRequestDTO[] }>(
    toUrl(queryParams)
  );

  return data;
}

function toUrl({ userId, roleId, postId }: GetJoinRequestsQueryParams) {
  const userQueryParam = userId ? `userId=${userId}` : undefined;
  const roleQueryParam = roleId ? `roleId=${roleId}` : undefined;
  const postQueryParam = postId ? `postId=${postId}` : undefined;
  const queryParams = [userQueryParam, roleQueryParam, postQueryParam].filter(
    (qp) => !!qp
  );
  const query = queryParams.join("&");

  const createJoinRequestUrl = joinRequestsUrl;

  return `${createJoinRequestUrl}?${query}`;
}
