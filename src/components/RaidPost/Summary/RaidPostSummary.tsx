import {
  AccordionSummary,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { RaidPostDTO } from "../../../services/gw2lfg-server/entities/RaidPostDTO";
import { RaidPostBossesSummary } from "./RaidPostBossesSummary";
import { RaidPostRolesSummary } from "./RolesPostRolesSummary";

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    groupSize: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

interface RaidPostSummaryProps {
  raidPost: RaidPostDTO;
  maxNumberOfBosses: number;
}

export default function RaidPostSummary(props: RaidPostSummaryProps) {
  const { raidPost, maxNumberOfBosses } = props;
  const maxSpots = 10;
  const spotsTaken = maxSpots - raidPost.roles.length;
  const classes = useStyles();

  return (
    <AccordionSummary>
      <Grid container>
        <Grid item xs={7} container direction="row">
          <RaidPostBossesSummary
            bosses={raidPost.bosses}
            max={maxNumberOfBosses}
          />
        </Grid>
        <Grid item xs={4} container direction="row">
          <RaidPostRolesSummary roles={raidPost.roles} />
        </Grid>
        <Grid item xs className={classes.groupSize}>
          {spotsTaken} / {maxSpots}
        </Grid>
      </Grid>
    </AccordionSummary>
  );
}
