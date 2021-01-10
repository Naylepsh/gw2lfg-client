import { Box, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useCreateJoinRequestMutation } from "../../../hooks/mutations/join-requests/useCreateJoinRequestMutation";
import { RoleDTO } from "../../../services/gw2lfg-server/entities/RoleDTO";
import RoleAvatar from "../../Role/RoleAvatar";
import LoadingButton from "../../common/buttons/LoadingButton";
import { useDeleteJoinRequestMutation } from "../../../hooks/mutations/join-requests/useDeleteJoinRequestMutation";
import { invalidateGetJoinRequestsQueries } from "../../../hooks/queries/join-requests/useGetJoinRequestsQuery";

interface RaidPostRoleDetailsProps {
  postId: number;
  role: RoleDTO;
  canUserJoin: boolean;
  roleIdToCancel?: number;
}

/* 
Renders full information of a given role
Displays a button allowing sending join request for that role.
*/
export function RaidPostRoleDetails(props: RaidPostRoleDetailsProps) {
  const { role, canUserJoin, roleIdToCancel, postId } = props;

  const [createJoinRequest] = useCreateJoinRequestMutation();
  const [cancelJoinRequest] = useDeleteJoinRequestMutation();

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
          {roleIdToCancel ? (
            <LoadingButton
              color="primary"
              variant="contained"
              disabled={!canUserJoin}
              onClick={async () => {
                await cancelJoinRequest({ id: roleIdToCancel });
                invalidateGetJoinRequestsQueries({ postId });
              }}
            >
              Cancel
            </LoadingButton>
          ) : (
            <LoadingButton
              color="primary"
              variant="contained"
              disabled={!canUserJoin}
              onClick={async () => {
                await createJoinRequest({ postId, roleId: role.id });
                invalidateGetJoinRequestsQueries({ postId });
              }}
            >
              Join
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
