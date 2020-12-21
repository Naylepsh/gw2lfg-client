import { gw2lfgUrl } from "../constants";
import { httpPost } from "../../http/postHttpService";

export const loginUrl = `${gw2lfgUrl}/login`;

export interface LoginUserDTO {
  username: string;
  password: string;
}

export async function loginUser(user: LoginUserDTO) {
  const { data } = await httpPost<LoginUserDTO, { data: { token: string }}>(loginUrl, user);
  return data.token;
}
