import {
  Box,
  createStyles,
  Grid,
  makeStyles,
  TableCell,
  Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import { useCreateJoinRequestMutation } from "../../../hooks/mutations/join-requests/useCreateJoinRequestMutation";
import { RoleDTO } from "../../../services/gw2lfg-server/entities/RoleDTO";
import RoleAvatar from "../../Role/RoleAvatar";
import LoadingButton from "../../common/buttons/LoadingButton";
import { JoinRequestDTO } from "../../../services/gw2lfg-server/entities/joinRequestDTO";

interface RaidPostRoleDetailsProps {
  postId: number;
  role: RoleDTO;
  canUserJoin: boolean;
}

/* 
Renders full information of a given role
Displays a button allowing sending join request for that role.
*/
export function RaidPostRoleDetails(props: RaidPostRoleDetailsProps) {
  const { role, canUserJoin, postId } = props;

  // states used for send join request button
  const [isDisabled, setIsDisabled] = useState(!canUserJoin);
  const [isLoading, setIsLoading] = useState(false);

  const [createJoinRequest] = useCreateJoinRequestMutation();
  const sendJoinRequest = async () => {
    setIsLoading(true);
    await createJoinRequest({ postId, roleId: role.id });
    setIsLoading(false);
    setIsDisabled(true);
  };

  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} md={2} className={classes.centeredItem}>
        <Box className={classes.centeredItem} flexDirection="column">
          <RoleAvatar {...role} size={"medium"} />
          <Box textAlign="center">{role.name}</Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={8} className={classes.centeredItem}>
        {role.description}
      </Grid>
      <Grid item xs={12} md={2} className={classes.centeredItem}>
        <Box>
          <LoadingButton
            color="primary"
            variant="contained"
            disabled={isDisabled}
            onClick={sendJoinRequest}
          >
            Join
          </LoadingButton>
        </Box>
      </Grid>
    </Grid>
  );
}

// CSS for RaidPostRolesDetails component
const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    centeredItem: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "10px 0",
    },
  })
);
