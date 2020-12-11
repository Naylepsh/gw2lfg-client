import { gw2lfgUrl } from "../constants";
import { httpPost } from "../../http/post.http.service";

export const registerUrl = `${gw2lfgUrl}/register`;

export interface RegisterUserDTO {
  username: string;
  password: string;
  apiKey: string;
}

export async function registerUser(user: RegisterUserDTO) {
  const token = await httpPost<RegisterUserDTO, string>(registerUrl, user);
  return token;
}
