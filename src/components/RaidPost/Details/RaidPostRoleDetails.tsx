import { Box, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React, { useState } from "react";
import { useCreateJoinRequestMutation } from "../../../hooks/mutations/join-requests/useCreateJoinRequestMutation";
import { RoleDTO } from "../../../services/gw2lfg-server/entities/RoleDTO";
import RoleAvatar from "../../Role/RoleAvatar";
import LoadingButton from "../../common/buttons/LoadingButton";
import { useDeleteJoinRequestMutation } from "../../../hooks/mutations/join-requests/useDeleteJoinRequestMutation";
import { invalidateGetJoinRequestsQueries } from "../../../hooks/queries/join-requests/useGetJoinRequestsQuery";

interface RaidPostRoleDetailsProps {
  postId: number;
  role: RoleDTO;
  canUserClickOnJoin: boolean;
  hasUserBeenAccepted: boolean;
  roleIdToCancel?: number;
}

/* 
Renders full information of a given role
Displays a button allowing sending join request for that role.
*/
export function RaidPostRoleDetails(props: RaidPostRoleDetailsProps) {
  const {
    role,
    roleIdToCancel,
    canUserClickOnJoin,
    hasUserBeenAccepted,
    postId,
  } = props;
  const [canClickOnJoin, setCanClickOnJoin] = useState(canUserClickOnJoin);
  const [joinButtonText, setJoinButtonText] = useState("JOIN");
  const cancelButtonText = hasUserBeenAccepted ? "LEAVE" : "CANCEL";

  const [createJoinRequest] = useCreateJoinRequestMutation();
  const [cancelJoinRequest] = useDeleteJoinRequestMutation();

  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} sm={2} className={classes.centeredItem}>
        <Box className={classes.centeredItem} flexDirection="column">
          <RoleAvatar {...role} size={"medium"} />
          <Box textAlign="center">{role.name}</Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} className={classes.centeredItem}>
        {role.description}
      </Grid>
      <Grid item xs={12} sm={2} className={classes.centeredItem}>
        <Box>
          {roleIdToCancel ? (
            <LoadingButton
              color="primary"
              variant="contained"
              onClick={async () => {
                await cancelJoinRequest({ id: roleIdToCancel });
                invalidateGetJoinRequestsQueries({ postId });
              }}
            >
              {cancelButtonText}
            </LoadingButton>
          ) : (
            <LoadingButton
              color="primary"
              variant="contained"
              disabled={!canClickOnJoin}
              onClick={async () => {
                const { error } = await createJoinRequest({
                  postId,
                  roleId: role.id,
                });
                if (error) {
                  setCanClickOnJoin(false);
                  setJoinButtonText("REQUIREMENTS UNSATISFIED");
                } else {
                  invalidateGetJoinRequestsQueries({ postId });
                }
              }}
            >
              {joinButtonText}
            </LoadingButton>
          )}
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
