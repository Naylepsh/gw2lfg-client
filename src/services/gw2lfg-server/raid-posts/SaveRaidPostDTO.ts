import { RoleDTO } from "../entities/RoleDTO";
import { RequirementsPropsDTO } from "./createRaidPostService";

export interface SaveRaidPostDTO {
  date: string;
  server: string;
  description?: string;
  bossesIds: number[];
  rolesProps?: RoleDTO[];
  requirementsProps?: RequirementsPropsDTO;
}
