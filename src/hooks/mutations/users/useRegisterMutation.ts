import { useMutation } from "react-query";
import { registerUser } from "../../../services/gw2lfg-server/user/registerService";

export function useRegisterMutation() {
  return useMutation(registerUser);
}
