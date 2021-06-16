import { useState } from "react";
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
  const [page, setPage] = useState(1);
  const key = props.key ?? "notifications";
  const config = {
    cacheTime: props.cacheTime,
    getFetchMore: ({ hasMore }) => {
      setPage(page + 1);
      return hasMore;
    },
  };

  return useInfiniteQuery(
    key,
    () => getNotifications({ params: props.params, page }),
    config
  );
};
