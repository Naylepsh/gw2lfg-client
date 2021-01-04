import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { httpPost } from "../../http/postHttpService";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { ItemRequirementDTO } from "../entities/ItemRequirementDTO";
import { RaidPostDTO } from "../entities/RaidPostDTO";
import { raidPostsUrl } from "./constants";
import { SaveRaidPostDTO } from "./SaveRaidPostDTO";

export interface RequirementsPropsDTO {
  itemsProps: ItemRequirementDTO[];
}

export const createRaidPostUrl = raidPostsUrl;

export async function createRaidPost(dto: SaveRaidPostDTO) {
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
