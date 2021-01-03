import { getAccessToken } from "../../../utils/auth/auth";
import { httpPost } from "../../http/postHttpService";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { ItemRequirementDTO } from "../entities/ItemRequirementDTO";
import { RaidPostDTO } from "../entities/RaidPostDTO";
import { RoleDTO } from "../entities/RoleDTO";
import { raidPostsUrl } from "./constants";

export interface RequirementsPropsDTO {
  itemsProps: ItemRequirementDTO[];
}

export interface CreateRaidPostDTO {
  date: string;
  server: string;
  description?: string;
  bossesIds: number[];
  rolesProps?: RoleDTO[];
  requirementsProps?: RequirementsPropsDTO;
}

export const createRaidPostUrl = raidPostsUrl;

export async function createRaidPost(dto: CreateRaidPostDTO) {
  dto.rolesProps = dto.rolesProps ?? [];
  dto.requirementsProps.itemsProps = dto.requirementsProps.itemsProps ?? [];

  const token = getAccessToken();
  const headers = createGw2lfgHeaders(token);

  const { data } = await httpPost<CreateRaidPostDTO, { data: RaidPostDTO }>(
    raidPostsUrl,
    dto,
    { headers }
  );

  return data;
}
