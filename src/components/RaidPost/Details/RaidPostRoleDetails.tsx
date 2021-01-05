import {
  Box,
  Button,
  TableCell,
  ButtonProps,
  CircularProgress,
} from "@material-ui/core";
import React, { useState } from "react";
import { useCreateJoinRequestMutation } from "../../../hooks/mutations/join-requests/useCreateJoinRequestMutation";
import { RoleDTO } from "../../../services/gw2lfg-server/entities/RoleDTO";
import RoleAvatar from "../../Role/RoleAvatar";

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

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}

function LoadingButton(props: LoadingButtonProps) {
  const { isLoading, children, disabled, ...rest } = props;
  return (
    <Button {...rest} disabled={disabled || isLoading}>
      {isLoading && <CircularProgress size={24} />}
      {!isLoading && children}
    </Button>
  );
}
