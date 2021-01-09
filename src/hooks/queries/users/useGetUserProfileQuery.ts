import { useQuery, queryCache } from "react-query";
import { getUserProfile } from "../../../services/gw2lfg-server/user/getProfileService";

export function useGetUserProfileQuery(id: string) {
  return useQuery(userProfileQueryKey, () => getUserProfile({ id }));
}

export function invalidateGetUserProfileQuery() {
  queryCache.invalidateQueries(userProfileQueryKey);
}

const userProfileQueryKey = "me";
