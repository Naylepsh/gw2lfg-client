import { useQuery, queryCache } from "react-query";
import getUserRaidPosts from "../../../services/gw2lfg-server/user/getUserRaidPostsService";

export function useGetUserRaidPostsQuery(id: string, page: number) {
  return useQuery(
    [userRaidPostsQueryKey, id, page],
    () => getUserRaidPosts({ id, page }),
    { keepPreviousData: true }
  );
}

export function invalidateGetUserRaidPostsQuery(id: string, page: number) {
  queryCache.invalidateQueries([userRaidPostsQueryKey, id, page]);
}

const userRaidPostsQueryKey = "getUserRaidPosts";
