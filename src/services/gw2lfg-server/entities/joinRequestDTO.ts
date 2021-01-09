import { RaidPostDTO } from "./RaidPostDTO";
import { RoleDTO } from "./RoleDTO";
import { UserDTO } from "./UserDTO";

export interface JoinRequestDTO {
  id: number;
  status: string;
  user: UserDTO;
  post: RaidPostDTO;
  role: RoleDTO;
}
