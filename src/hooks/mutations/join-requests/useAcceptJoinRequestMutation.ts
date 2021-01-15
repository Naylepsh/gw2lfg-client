import { useMutation } from "react-query";
import acceptJoinRequest from "../../../services/gw2lfg-server/join-requests/acceptJoinRequestService";

export function useAcceptJoinRequestMutation() {
  return useMutation(acceptJoinRequest);
}
