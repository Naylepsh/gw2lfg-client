import { UserDTO } from "./UserDTO";

export interface UserProfileDTO {
  user: UserDTO;
  account: {
    name: string;
  };
}
