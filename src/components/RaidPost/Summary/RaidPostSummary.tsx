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

interface RaidPostSummaryProps {
  raidPost: RaidPostDTO;
  maxNumberOfBosses: number;
}

/*
Component for displaying summarized raid post data, such as declared bosses and roles.
*/
export default function RaidPostSummary(props: RaidPostSummaryProps) {
  const { raidPost, maxNumberOfBosses } = props;
  const maxSpots = 10;
  const spotsTaken = maxSpots - raidPost.roles.length;
  const classes = useStyles();

  return (
    <AccordionSummary>
      <Grid container>
        <Grid item xs={12} md={7} container direction="row">
          <RaidPostBossesSummary
            bosses={raidPost.bosses}
            max={maxNumberOfBosses}
          />
        </Grid>
        <Grid item xs={12} md={4} container direction="row">
          <RaidPostRolesSummary roles={raidPost.roles} />
        </Grid>
        <Grid item xs={12} md className={classes.groupSize}>
          {spotsTaken} / {maxSpots}
        </Grid>
      </Grid>
    </AccordionSummary>
  );
}

// CSS for RaidPostSummary component
const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    groupSize: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);
