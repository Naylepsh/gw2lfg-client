import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { RoleDTO } from "../../../services/gw2lfg-server/raid-post/getRaidPostsService";
import { RaidPostRoleDetails } from "./RaidPostRoleDetails";

interface RaidPostRolesDetailsProps {
  roles: RoleDTO[];
  canUserJoin: boolean;
}

export function RaidPostRolesDetails(props: RaidPostRolesDetailsProps) {
  const { roles, canUserJoin } = props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="raid post roles details">
        <TableHead>
          <TableRow>
            <TableCell>Role</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role, key) => (
            <TableRow key={key}>
              <RaidPostRoleDetails role={role} canUserJoin={canUserJoin} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
