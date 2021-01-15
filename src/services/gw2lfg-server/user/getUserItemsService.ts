import { ItemDTO } from "../entities/ItemDTO";
import { usersUrl } from "./getProfileService";
import { GetUserItemsDTO } from "./dtos/GetUserItemsDTO";
import { HttpGet } from "../../http/get/httpGetType";
import { axiosHttpGetAdapter } from "../../http/get/axiosHttpGetAdapter";

/* 
Sends GET /users/:id/items request to gw2lfg-server
*/
export function getUserItems(httpGet: HttpGet) {
  return async function (dto: GetUserItemsDTO) {
    const { data } = await httpGet<{ data: ItemDTO[] }>(
      `${usersUrl}/${dto.id}/items`
    );

    return data;
  };
}

/*
Function with axios adapter injected.
*/
export default getUserItems(axiosHttpGetAdapter);
