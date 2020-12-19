import { Box, Button, TableCell } from "@material-ui/core";
import React from "react";
import { RoleDTO } from "../../../services/gw2lfg-server/raid-post/getRaidPostsService";
import RoleAvatar from "../../Role/RoleAvatar";

interface RaidPostRoleDetailsProps {
  role: RoleDTO;
  canUserJoin: boolean;
}

export function RaidPostRoleDetails(props: RaidPostRoleDetailsProps) {
  const { role, canUserJoin } = props;

  return (
    <React.Fragment>
      <TableCell component="th" scope="row">
        <Box display="flex" justifyContent="center" alignItems="center">
          <RoleAvatar {...role} size={"medium"} />
        </Box>
        <Box textAlign="center">{role.name}</Box>
      </TableCell>
      <TableCell>{role.description}</TableCell>
      <TableCell align="right">
        <Button color="primary" variant="contained" disabled={!canUserJoin}>
          Join
        </Button>
      </TableCell>
    </React.Fragment>
  );
}
