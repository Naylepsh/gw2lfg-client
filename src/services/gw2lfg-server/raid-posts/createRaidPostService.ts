import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { httpPost } from "../../http/postHttpService";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { RaidPostDTO } from "../entities/RaidPostDTO";
import { raidPostsUrl } from "./constants";
import { SaveRaidPostDTO } from "./dtos/SaveRaidPostDTO";

export async function createRaidPost(dto: SaveRaidPostDTO) {
  // assign default values if dto is lacking following properties
  dto.rolesProps = dto.rolesProps ?? [];
  dto.requirementsProps.itemsProps = dto.requirementsProps.itemsProps ?? [];

  const token = getAccessToken();
  const headers = createGw2lfgHeaders(token);

  const { data } = await httpPost<SaveRaidPostDTO, { data: RaidPostDTO }>(
    createRaidPostUrl,
    dto,
    { headers }
  );

  return data;
}

export const createRaidPostUrl = raidPostsUrl;
