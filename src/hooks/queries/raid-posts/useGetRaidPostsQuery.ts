import { useQuery, queryCache } from "react-query";
import { getRaidPosts } from "../../../services/gw2lfg-server/raid-posts/getRaidPostsService";

export function useGetRaidPostsQuery(page: number) {
  return useQuery([getRaidPostsQueryKey, page], () => getRaidPosts({ page }), {
    keepPreviousData: true,
  });
}

export function invalidateGetRaidPostsQueries() {
  queryCache.invalidateQueries(getRaidPostsQueryKey);
}

const getRaidPostsQueryKey = "getRaidPostsOnPage";
