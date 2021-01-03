import { RoleDTO } from "../../../services/gw2lfg-server/entities/RoleDTO";

export interface RaidPostFormValues {
  server: string;
  date: string;
  description: string;
  selectedBosses: string[];
  requirementsProps: RequirementsProps;
  rolesProps: RoleDTO[];
}

export interface RequirementsProps {
  itemsProps: RequirementsItemsProps;
}

interface RequirementsItemsProps {
  [key: string]: number;
}
