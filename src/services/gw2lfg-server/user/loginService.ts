import { gw2lfgUrl } from "../constants";
import { LoginUserDTO } from "./dtos/LoginUserDTO";
import { HttpPost } from "../../http/post/httpPostType";
import { axiosHttpPostAdapter } from "../../http/post/axiosHttpPostAdapter";

/* 
Sends POST /login request to gw2lfg-server
*/
export function loginUser(httpPost: HttpPost) {
  return async function (dto: LoginUserDTO) {
    const { data, error } = await httpPost<
      LoginUserDTO,
      { data: { token: string } }
    >(loginUrl, dto);

    return { data: data?.data, error };
  };
}

/*
Function with axios adapter injected.
*/
export default loginUser(axiosHttpPostAdapter);

export const loginUrl = `${gw2lfgUrl}/login`;
