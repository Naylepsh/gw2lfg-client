import { gw2lfgUrl } from "../constants";
import { httpPost } from "../../http/postHttpService";

export interface RegisterUserDTO {
  username: string;
  password: string;
  apiKey: string;
}

// sends POST /register request to gw2lfg-server
export async function registerUser(user: RegisterUserDTO) {
  const { data, error } = await httpPost<
    RegisterUserDTO,
    { data: { token: string } }
  >(registerUrl, user);

  return { data: data?.data, error };
}

export const registerUrl = `${gw2lfgUrl}/register`;
