import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { httpPut } from "../../http/putHttpService";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { RaidPostDTO } from "../entities/RaidPostDTO";
import { raidPostsUrl } from "./constants";
import { SaveRaidPostDTO } from "./dtos/SaveRaidPostDTO";

interface UpdateRaidPostDTO extends SaveRaidPostDTO {
  id: string;
}

// sends PUT /raid-posts/:id request to gw2lfg-server
export async function updateRaidPost({
  id,
  ...raidPostDto
}: UpdateRaidPostDTO) {
  // assign default values if dto is lacking following properties
  raidPostDto.rolesProps = raidPostDto.rolesProps ?? [];
  raidPostDto.requirementsProps.itemsProps =
    raidPostDto.requirementsProps.itemsProps ?? [];

  // Access token is required
  const token = getAccessToken();
  const headers = createGw2lfgHeaders(token);

  const { data } = await httpPut<SaveRaidPostDTO, { data: RaidPostDTO }>(
    getRaidPostUrl(id),
    raidPostDto,
    { headers }
  );

  return data;
}

export const getRaidPostUrl = (id: string) => {
  return `${raidPostsUrl}/${id}`;
};
