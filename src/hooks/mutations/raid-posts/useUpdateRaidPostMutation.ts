import { useMutation } from "react-query";
import { updateRaidPost } from "../../../services/gw2lfg-server/raid-post/updateRaidPostService";

export function useUpdateRaidPostMutation() {
  return useMutation(updateRaidPost);
}