import { Box, TableCell } from "@material-ui/core";
import React, { useState } from "react";
import { useCreateJoinRequestMutation } from "../../../hooks/mutations/join-requests/useCreateJoinRequestMutation";
import { RoleDTO } from "../../../services/gw2lfg-server/entities/RoleDTO";
import RoleAvatar from "../../Role/RoleAvatar";
import LoadingButton from "../../common/buttons/LoadingButton";

interface RaidPostRoleDetailsProps {
  postId: number;
  role: RoleDTO;
  canUserJoin: boolean;
}

export function RaidPostRoleDetails(props: RaidPostRoleDetailsProps) {
  const { role, canUserJoin, postId } = props;
  const [isDisabled, setIsDisabled] = useState(!canUserJoin);
  const [isLoading, setIsLoading] = useState(false);
  const [createJoinRequest] = useCreateJoinRequestMutation();
  const sendJoinRequest = async () => {
    setIsLoading(true);
    await createJoinRequest({ postId, roleId: role.id });
    setIsLoading(false);
    setIsDisabled(true);
  };

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
        <LoadingButton
          color="primary"
          variant="contained"
          disabled={isDisabled}
          onClick={sendJoinRequest}
          isLoading={isLoading}
        >
          Join
        </LoadingButton>
      </TableCell>
    </React.Fragment>
  );
}
