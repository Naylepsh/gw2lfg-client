import { useQuery, queryCache } from "react-query";
import getRaidPost from "../../../services/gw2lfg-server/raid-posts/getRaidPostService";

export function useGetRaidPostQuery(id: string) {
  return useQuery([getRaidPostQueryKey, id], () => getRaidPost({ id }));
}

export function invalidateGetRaidPostQuery(id: string) {
  queryCache.invalidateQueries([getRaidPostQueryKey, id]);
}

const getRaidPostQueryKey = "getRaidPost";
