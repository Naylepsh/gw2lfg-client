import { gw2lfgUrl } from "../constants";
import { httpPost } from "../../http/postHttpService";

export interface LoginUserDTO {
  username: string;
  password: string;
}

// sends POST /login request to gw2lfg-server
export async function loginUser(user: LoginUserDTO) {
  const { data, error } = await httpPost<
    LoginUserDTO,
    { data: { token: string } }
  >(loginUrl, user);

  return { data: data?.data, error };
}

export const loginUrl = `${gw2lfgUrl}/login`;
