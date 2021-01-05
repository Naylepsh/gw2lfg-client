import { useMutation } from "react-query";
import { createJoinRequest } from "../../../services/gw2lfg-server/join-requests/createJoinRequestService";

export function useCreateJoinRequestMutation() {
  return useMutation(createJoinRequest);
}
