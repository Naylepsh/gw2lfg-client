import { useQuery, queryCache } from "react-query";
import { getMe } from "../../../services/gw2lfg-server/user/meService";

export function useMeQuery() {
  return useQuery(meQueryKey, () => getMe(), { retry: 1 });
}

export function invalidateMeQuery() {
  queryCache.invalidateQueries(meQueryKey);
}

const meQueryKey = "me";
