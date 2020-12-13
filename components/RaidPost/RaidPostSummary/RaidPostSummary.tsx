import { AccordionSummary, Grid } from "@material-ui/core";
import React from "react";
import { RaidPostDTO } from "../../../services/gw2lfg-server/raid-post/getRaidPostsService";
import { RaidPostBossesSummary } from "./RaidPostBossesSummary";
import { RaidPostRolesSummary } from "./RolesPostRolesSummary";

interface RaidPostSummaryProps {
  raidPost: RaidPostDTO;
}

export default function RaidPostSummary(props: RaidPostSummaryProps) {
  const { raidPost } = props;
  const maxSpots = 10;
  const spotsTaken = maxSpots - raidPost.roles.length;

  return (
    <AccordionSummary>
      <Grid container>
        <Grid item xs={7} container direction="row">
          <RaidPostBossesSummary bosses={raidPost.bosses} />
        </Grid>
        <Grid item xs={4} container direction="row">
          <RaidPostRolesSummary roles={raidPost.roles} />
        </Grid>
        <Grid item xs>
          {spotsTaken} / {maxSpots}
        </Grid>
      </Grid>
    </AccordionSummary>
  );
}
