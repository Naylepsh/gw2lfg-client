import { useQuery, queryCache } from "react-query";
import { getUserRaidClearStatus } from "../../../services/gw2lfg-server/user/getUserRaidClearStatusService";

export function useGetUserRaidClearStatusQuery(id: string) {
  return useQuery([userRaidClearStatusQueryKey, id], () =>
    getUserRaidClearStatus({ id })
  );
}

export function invalidateGetUserRaidClearStatusQuery(id: string) {
  queryCache.invalidateQueries([userRaidClearStatusQueryKey, id]);
}

const userRaidClearStatusQueryKey = "getUserRaidClearStatus";
