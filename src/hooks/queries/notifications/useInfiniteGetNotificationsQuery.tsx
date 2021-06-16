import { useInfiniteQuery } from "react-query";
import getNotifications from "../../../services/gw2lfg-server/notifications/getNotificationsService";

interface InfiniteNotificationsQueryProps {
  params: {
    recipent: string;
  };
  key?: string;
  cacheTime?: number;
}

export const useInfiniteGetNotificationsQuery = (
  props: InfiniteNotificationsQueryProps
) => {
  const key = props.key ?? "notifications";
  const config = {
    cacheTime: props.cacheTime,
    getFetchMore: (lastPage) => lastPage.nextPage,
  };

  return useInfiniteQuery(
    key,
    (_key, page: number = 1) =>
      getNotifications({ params: props.params, page }),
    { keepPreviousData: true, ...config }
  );
};
