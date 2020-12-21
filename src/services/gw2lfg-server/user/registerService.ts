import { gw2lfgUrl } from "../constants";
import { httpPost } from "../../http/postHttpService";

export const registerUrl = `${gw2lfgUrl}/register`;

export interface RegisterUserDTO {
  username: string;
  password: string;
  apiKey: string;
}

export async function registerUser(user: RegisterUserDTO) {
  const { data } = await httpPost<RegisterUserDTO, { data: { token: string } }>(
    registerUrl,
    user
  );
  return data.token;
}
