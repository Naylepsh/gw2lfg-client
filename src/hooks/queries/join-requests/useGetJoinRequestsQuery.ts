import { useQuery, queryCache } from "react-query";
import {
  getJoinRequests,
  GetJoinRequestsQueryParams,
} from "../../../services/gw2lfg-server/join-requests/getJoinRequestsService";

const queryKey = "getJoinRequests";

export function useGetJoinRequestsQuery(
  queryParams: GetJoinRequestsQueryParams
) {
  return useQuery([queryKey, queryParams], () => getJoinRequests(queryParams));
}

export function invalidateGetJoinRequestsQueries() {
  queryCache.invalidateQueries(queryKey);
}
