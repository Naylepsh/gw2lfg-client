import { useQuery, queryCache } from "react-query";
import { getRaidPost } from "../../../services/gw2lfg-server/raid-post/getRaidPostService";

const queryKey = "getRaidPost";

export function useGetRaidPostQuery(id: string) {
  return useQuery([queryKey, id], () => getRaidPost({ id }));
}

export function invalidateGetRaidPostQueries() {
  queryCache.invalidateQueries(queryKey);
}
