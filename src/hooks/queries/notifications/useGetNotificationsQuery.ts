import { useQuery } from "react-query";
import { GetNotificationsQueryParams } from "../../../services/gw2lfg-server/notifications/dtos/GetNotificationsDTO";
import getNotifications from "../../../services/gw2lfg-server/notifications/getNotificationsService";

interface UseGetNotificationsQueryProps {
  params: GetNotificationsQueryParams;
  page: number;
  key: string;
  keepPreviousData?: boolean;
  refetchInterval?: number;
}

export function useGetNotificationsQuery(props: UseGetNotificationsQueryProps) {
  const { page, params, key, ...options } = props;

  const query = () => getNotifications({ page, params });

  return useQuery(key, query, options);
}
