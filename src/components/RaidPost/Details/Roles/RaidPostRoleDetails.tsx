import { Box, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { RoleDTO } from "../../../../services/gw2lfg-server/entities/RoleDTO";
import RoleAvatar from "../../../Role/RoleAvatar";
import { SendRequestButton } from "./SendRequestButton";
import { RemoveRequestButton } from "./RemoveRequestButton";

interface RaidPostRoleDetailsProps {
  postId: number;
  role: RoleDTO;
  canUserClickOnJoin: boolean;
  hasUserBeenAccepted: boolean;
  roleIdToCancel?: number;
}

/**
 * Renders full information of a given role
 * Displays a button allowing sending / canceling join request for that role.
 */
export function RaidPostRoleDetails(props: RaidPostRoleDetailsProps) {
  const {
    role,
    roleIdToCancel,
    canUserClickOnJoin,
    hasUserBeenAccepted,
    postId,
  } = props;
  const requestRemovalButtonLabel = hasUserBeenAccepted ? "LEAVE" : "CANCEL";

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
            <RemoveRequestButton
              roleIdToCancel={roleIdToCancel}
              postId={postId}
              label={requestRemovalButtonLabel}
            />
          ) : (
            <SendRequestButton
              canUserClickOnJoin={canUserClickOnJoin}
              postId={postId}
              roleId={role.id}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

/**
 * CSS for RaidPostRolesDetails component
 */
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
