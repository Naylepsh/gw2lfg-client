import { Button, TableCell } from "@material-ui/core";
import React from "react";
import { RoleDTO } from "../../../services/gw2lfg-server/raid-post/getRaidPostsService";
import RoleAvatar from "../../Role/RoleAvatar";

interface RaidPostRoleDetailsProps {
  role: RoleDTO;
}

export function RaidPostRoleDetails(props: RaidPostRoleDetailsProps) {
  const { role } = props;

  return (
    <React.Fragment>
      <TableCell component="th" scope="row">
        <RoleAvatar {...role} />
      </TableCell>
      <TableCell align="right">{role.description}</TableCell>
      <TableCell align="right">
        <Button>Join</Button>
      </TableCell>
    </React.Fragment>
  );
}
