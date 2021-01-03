import { useQuery, queryCache } from "react-query";
import { getMe } from "../../../services/gw2lfg-server/user/meService";

const queryKey = "me";

export function useMeQuery() {
  return useQuery(queryKey, () => getMe(), { retry: 1 });
}

export function invalidateMeQuery() {
  queryCache.invalidateQueries(queryKey);
}
