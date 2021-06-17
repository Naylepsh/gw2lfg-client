import { raidPostsUrl } from "./constants";
import { RaidPostDTO } from "../entities/RaidPostDTO";
import { GetPostsQueryParams, GetRaidPostsDTO } from "./dtos/GetRaidPostsDTO";
import { createPaginationQuery } from "../createPaginationQuery";
import { HttpGet } from "../../http/get/httpGetType";
import { axiosHttpGetAdapter } from "../../http/get/axiosHttpGetAdapter";

/**
 * Sends GET /raid-posts request to gw2lfg-server
 */
export function getRaidPosts(httpGet: HttpGet) {
  return async function (dto: GetRaidPostsDTO) {
    const query = createQuery(dto);
    const url = `${getRaidPostsUrl}?${query}`;

    const { data: raidPosts, hasMore } = await httpGet<{
      data: RaidPostDTO[];
      hasMore: boolean;
    }>(url);

    return { raidPosts, hasMore };
  };
}

function createQuery(dto: GetRaidPostsDTO) {
  return [createPaginationQuery(dto.page), createParamQuery(dto.params)]
    .filter((q) => !!q)
    .join("&");
}

function createParamQuery(params: GetPostsQueryParams) {
  const query = [];
  for (const param in params) {
    const value = mapToQueryValue(params[param]);
    query.push(`${param}=${value}`);
  }

  return query.join("&");
}

function mapToQueryValue(value: any) {
  if (Array.isArray(value)) {
    value = value.join(",");
  }

  return value;
}

/**
 * Function with axios adapter injected.
 */
export default getRaidPosts(axiosHttpGetAdapter);

export const getRaidPostsUrl = raidPostsUrl;
