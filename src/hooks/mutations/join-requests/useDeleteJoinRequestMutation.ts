import { useMutation } from "react-query";
import { deleteJoinRequest } from "../../../services/gw2lfg-server/join-requests/deleteJoinRequestService";

export function useDeleteJoinRequestMutation() {
  return useMutation(deleteJoinRequest);
}
