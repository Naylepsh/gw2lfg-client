import { useQuery, queryCache } from "react-query";
import getUserItems from "../../../services/gw2lfg-server/user/getUserItemsService";

export function useGetUserItemsQuery(id: string) {
  return useQuery([userItemsQueryKey, id], () => getUserItems({ id }));
}

export function invalidateGetUserItemsQuery(id: string) {
  queryCache.invalidateQueries([userItemsQueryKey, id]);
}

const userItemsQueryKey = "getUserItems";
