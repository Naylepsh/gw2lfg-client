import { useQuery } from "react-query";
import { getMe } from "../../../services/gw2lfg-server/user/meService";

export function useMeQuery() {
  return useQuery("me", () => getMe(), { retry: 1 });
}
