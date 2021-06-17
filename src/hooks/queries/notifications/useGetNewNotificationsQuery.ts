import { useGetNotificationsQuery } from "./useGetNotificationsQuery";

interface UseGetNewNotificationsQueryProps {
  recipent: string;
  key: string;
  refetchInterval?: number;
}

export function useGetNewNotificationsQuery(
  props: UseGetNewNotificationsQueryProps
) {
  const refetchInterval = props.refetchInterval ?? 5000;
  return useGetNotificationsQuery({
    params: { recipent: props.recipent, seen: false },
    page: 1,
    key: props.key,
    refetchInterval,
  });
}
