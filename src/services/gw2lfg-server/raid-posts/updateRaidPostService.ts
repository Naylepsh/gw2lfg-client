import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { axiosHttpPutAdapter } from "../../http/put/axiosHttpPutAdapter";
import { HttpPut } from "../../http/put/httpPutType";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { RaidPostDTO } from "../entities/RaidPostDTO";
import { raidPostsUrl } from "./constants";
import { SaveRaidPostDTO } from "./dtos/SaveRaidPostDTO";

interface UpdateRaidPostDTO extends SaveRaidPostDTO {
  id: string;
}

/* 
Sends PUT /raid-posts/:id request to gw2lfg-server
*/
export function updateRaidPost(httpPut: HttpPut) {
  return async function ({ id, ...raidPostDto }: UpdateRaidPostDTO) {
    // assign default values if dto is lacking following properties
    raidPostDto.rolesProps = raidPostDto.rolesProps ?? [];
    raidPostDto.requirementsProps.itemsProps =
      raidPostDto.requirementsProps.itemsProps ?? [];

    // Access token is required
    const token = getAccessToken();
    const headers = createGw2lfgHeaders(token);

    const { data, error } = await httpPut<
      SaveRaidPostDTO,
      { data: RaidPostDTO }
    >(getRaidPostUrl(id), raidPostDto, { headers });

    return { data: data?.data, error };
  };
}

/*
Function with axios adapter injected.
*/
export default updateRaidPost(axiosHttpPutAdapter);

export const getRaidPostUrl = (id: string) => {
  return `${raidPostsUrl}/${id}`;
};
