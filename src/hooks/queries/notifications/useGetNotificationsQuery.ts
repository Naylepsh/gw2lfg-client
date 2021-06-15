import { useQuery, queryCache } from "react-query";
import { GetNotificationsQueryParams } from "../../../services/gw2lfg-server/notifications/dtos/GetNotificationsDTO";
import getNotifications from "../../../services/gw2lfg-server/notifications/getNotificationsService";

export function useGetNotificationsQuery(
  params: GetNotificationsQueryParams,
  page: number
) {
  const key = createQueryKey(params, page);
  const query = () => getNotifications({ page, params });
  const options = {
    keepPreviousData: true,
  };

  return useQuery(key, query, options);
}

export function invalidateGetRaidPostsQueries() {
  queryCache.invalidateQueries(queryKeyPrefix);
}

function createQueryKey(params: GetNotificationsQueryParams, page: number) {
  return [queryKeyPrefix, params, page];
}

const queryKeyPrefix = "getNotificationsOnPage";
