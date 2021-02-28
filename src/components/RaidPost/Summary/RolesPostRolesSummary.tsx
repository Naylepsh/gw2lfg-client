import React from "react";
import RoleAvatar from "../../Role/RoleAvatar";
import { RoleDTO } from "../../../services/gw2lfg-server/entities/RoleDTO";
import { makeStyles, Theme, createStyles, Box } from "@material-ui/core";

export interface RaidRolesSummaryProps {
  roles: RoleDTO[];
}

/**
 * Component for displaying roles part of a raid post.
 */
export function RaidPostRolesSummary(props: RaidRolesSummaryProps) {
  const { roles } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      {roles.map((role, key) => (
        <Box my={1} className={classes.root} key={key}>
          <RoleAvatar {...role} size={"small"} />
        </Box>
      ))}
    </React.Fragment>
  );
}

/**
 * CSS for RaidPostRolesSummary component
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);
