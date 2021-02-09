import { useQuery, queryCache } from "react-query";
import { GetPostsQueryParams } from "../../../services/gw2lfg-server/raid-posts/dtos/GetRaidPostsDTO";
import getRaidPosts from "../../../services/gw2lfg-server/raid-posts/getRaidPostsService";

export function useGetRaidPostsQuery(
  params: GetPostsQueryParams,
  page: number
) {
  const key = createQueryKey(params, page);
  const query = () => getRaidPosts({ page, params });
  const options = {
    keepPreviousData: true,
  };

  return useQuery(key, query, options);
}

export function invalidateGetRaidPostsQueries() {
  queryCache.invalidateQueries(queryKeyPrefix);
}

function createQueryKey(params: GetPostsQueryParams, page: number) {
  return [queryKeyPrefix, params, page];
}

const queryKeyPrefix = "getRaidPostsOnPage";
