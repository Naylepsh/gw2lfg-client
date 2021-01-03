import { useQuery, queryCache } from "react-query";
import { getRaidPosts } from "../../../services/gw2lfg-server/raid-post/getRaidPostsService";

const queryKey = "getRaidPostsOnPage";

export function useGetRaidPostsQuery(page: number) {
  return useQuery([queryKey, page], () => getRaidPosts({ page }), {
    keepPreviousData: true,
  });
}

export function invalidateGetRaidPostsQueries() {
  queryCache.invalidateQueries(queryKey);
}
