import { useMutation } from "react-query";
import deleteRaidPost from "../../../services/gw2lfg-server/raid-posts/deleteRaidPostService";

export function useDeleteRaidPostMutation() {
  return useMutation(deleteRaidPost);
}
