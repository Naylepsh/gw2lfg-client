import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { httpPost } from "../../http/postHttpService";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { RaidPostDTO } from "../entities/RaidPostDTO";
import { raidPostsUrl } from "./constants";
import { SaveRaidPostDTO } from "./dtos/SaveRaidPostDTO";

// Sends POST /raid-posts request to gw2lfg-server
export async function createRaidPost(dto: SaveRaidPostDTO) {
  // Assign default values if dto is lacking following properties
  dto.rolesProps = dto.rolesProps ?? [];
  dto.requirementsProps.itemsProps = dto.requirementsProps.itemsProps ?? [];

  // Access token is required
  const token = getAccessToken();
  const headers = createGw2lfgHeaders(token);

  const { data, error } = await httpPost<SaveRaidPostDTO, { data: RaidPostDTO }>(
    createRaidPostUrl,
    dto,
    { headers }
  );

  return { data: data?.data, error }
}

export const createRaidPostUrl = raidPostsUrl;
