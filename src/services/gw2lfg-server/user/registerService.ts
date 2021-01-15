import { gw2lfgUrl } from "../constants";
import { RegisterUserDTO } from "./dtos/RegisterUserDTO";
import { HttpPost } from "../../http/post/httpPostType";
import { axiosHttpPostAdapter } from "../../http/post/axiosHttpPostAdapter";

/* 
Sends POST /register request to gw2lfg-server
*/
export function registerUser(httpPost: HttpPost) {
  return async function (dto: RegisterUserDTO) {
    const { data, error } = await httpPost<
      RegisterUserDTO,
      { data: { token: string } }
    >(registerUrl, dto);

    return { data: data?.data, error };
  };
}

/*
Function with axios adapter injected.
*/
export default registerUser(axiosHttpPostAdapter)

export const registerUrl = `${gw2lfgUrl}/register`;
