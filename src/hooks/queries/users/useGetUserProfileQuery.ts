import { useQuery, queryCache } from "react-query";
import getUserProfile from "../../../services/gw2lfg-server/user/getProfileService";

export function useGetUserProfileQuery(id: string) {
  return useQuery([userProfileQueryKey, id], () => getUserProfile({ id }));
}

export function invalidateGetUserProfileQuery(id: string) {
  queryCache.invalidateQueries([userProfileQueryKey, id]);
}

const userProfileQueryKey = "getUserProfile";
