import { useQuery, queryCache } from "react-query";
import { getRaidPost } from "../../../services/gw2lfg-server/raid-posts/getRaidPostService";

export function useGetRaidPostQuery(id: string) {
  return useQuery([getRaidPostQueryKey, id], () => getRaidPost({ id }));
}

export function invalidateGetRaidPostQueries(id: string) {
  // Invalidates every getRaidPost query (of all ids)
  queryCache.invalidateQueries([getRaidPostQueryKey, id]);
}

const getRaidPostQueryKey = "getRaidPost";
