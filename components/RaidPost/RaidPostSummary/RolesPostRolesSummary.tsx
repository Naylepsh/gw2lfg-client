import React from "react";
import RoleAvatar from "../../Role/RoleAvatar";
import { RoleDTO } from "../../../services/gw2lfg-server/raid-post/getRaidPostsService";

export interface RaidRolesSummaryProps {
  roles: RoleDTO[];
}

export function RaidPostRolesSummary(props: RaidRolesSummaryProps) {
  const { roles } = props;
  return (
    <React.Fragment>
      {roles.map((role, key) => (
        <RoleAvatar {...role} key={key} />
      ))}
    </React.Fragment>
  );
}
