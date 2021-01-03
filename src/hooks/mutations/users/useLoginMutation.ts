import { useMutation } from "react-query";
import { loginUser } from "../../../services/gw2lfg-server/user/loginService";

export function useLoginMutation() {
  return useMutation(loginUser);
}
