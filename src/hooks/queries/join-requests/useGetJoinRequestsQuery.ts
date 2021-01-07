import { useQuery, queryCache } from "react-query";
import {
  getJoinRequests,
  GetJoinRequestsQueryParams,
} from "../../../services/gw2lfg-server/join-requests/getJoinRequestsService";

export function useGetJoinRequestsQuery(
  queryParams: GetJoinRequestsQueryParams
) {
  return useQuery([getJoinRequestsQueryKey, queryParams], () =>
    getJoinRequests(queryParams)
  );
}

export function invalidateGetJoinRequestsQueries() {
  queryCache.invalidateQueries(getJoinRequestsQueryKey);
}

const getJoinRequestsQueryKey = "getJoinRequests";
