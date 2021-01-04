import { UserDTO } from "./UserDTO";
import { RaidBossDTO } from "./RaidBossDTO";
import { RoleDTO } from "./RoleDTO";
import { ItemRequirementDTO } from "./ItemRequirementDTO";

export interface RaidPostDTO {
  id: number;
  date: string;
  server: string;
  description?: string;
  author: UserDTO;
  bosses: RaidBossDTO[];
  requirements: {
    items: ItemRequirementDTO[];
  };
  userMeetsRequirements: boolean;
  roles: RoleDTO[];
}
