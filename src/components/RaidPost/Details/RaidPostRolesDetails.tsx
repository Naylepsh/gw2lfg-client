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
import { RoleDTO } from "../../../services/gw2lfg-server/entities/RoleDTO";
import { RaidPostRoleDetails } from "./RaidPostRoleDetails";

interface RaidPostRolesDetailsProps {
  postId: number;
  roles: RoleDTO[];
  canUserJoin: boolean;
}

// Renders detailed information on given raid post's roles
export function RaidPostRolesDetails(props: RaidPostRolesDetailsProps) {
  const { roles, canUserJoin, postId } = props;

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
              <RaidPostRoleDetails
                role={role}
                canUserJoin={canUserJoin}
                postId={postId}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
