import { UserDTO } from "./UserDTO";
import { RaidBossDTO } from "./RaidBossDTO";
import { RequirementDTO } from "./RequirementDTO";
import { RoleDTO } from "./RoleDTO";

export interface RaidPostDTO {
  id: number;
  date: Date;
  server: string;
  description?: string;
  author: UserDTO;
  bosses: RaidBossDTO[];
  requirements: RequirementDTO[];
  userMeetsRequirements: boolean;
  roles: RoleDTO[];
}
