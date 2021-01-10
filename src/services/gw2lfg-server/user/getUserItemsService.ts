import { httpGet } from "../../http/getHttpService";
import { ItemDTO } from "../entities/ItemDTO";
import { usersUrl } from "./getProfileService";
import { GetUserItemsDTO } from "./dtos/GetUserItemsDTO";

/* 
Sends GET /users/:id/items request to gw2lfg-server
*/
export async function getUserItems(dto: GetUserItemsDTO) {
  const { data } = await httpGet<{ data: ItemDTO[] }>(
    `${usersUrl}/${dto.id}/items`
  );

  return data;
}
