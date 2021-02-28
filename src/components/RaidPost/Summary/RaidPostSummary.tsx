import { Box, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { RaidPostDTO } from "../../../services/gw2lfg-server/entities/RaidPostDTO";
import { RaidPostBossesSummary } from "./RaidPostBossesSummary";
import { RaidPostRolesSummary } from "./RolesPostRolesSummary";

interface RaidPostSummaryProps {
  raidPost: RaidPostDTO;
  maxNumberOfBosses: number;
}

/**
 * Component for displaying summarized raid post data, such as declared bosses and roles.
 */
export default function RaidPostSummary(props: RaidPostSummaryProps) {
  const { raidPost, maxNumberOfBosses } = props;

  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} md={6} container direction="row">
        <RaidPostBossesSummary
          bosses={raidPost.bosses}
          max={maxNumberOfBosses}
        />
      </Grid>
      <Grid item xs={12} md={4} container direction="row">
        <RaidPostRolesSummary roles={raidPost.roles} />
      </Grid>
      <Grid item xs={12} md={2} className={classes.centeredItem}>
        <Box display="flex" flexDirection="column">
          <Box>Server: {raidPost.server}</Box>
          <Box>{new Date(raidPost.date).toLocaleString()}</Box>
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
    },
  })
);
