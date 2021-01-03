import { useMutation } from "react-query";
import { createRaidPost } from "../../../services/gw2lfg-server/raid-post/createRaidPostService";

export function useCreateRaidPostMutation() {
  return useMutation(createRaidPost);
}
