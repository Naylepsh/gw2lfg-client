import { useMutation } from "react-query";
import { CreateJoinRequest } from "../../../services/gw2lfg-server/join-requests/createJoinRequestService";

export function useCreateJoinRequestMutation() {
  return useMutation(CreateJoinRequest);
}
