import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
} from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import RaidBossAvatar from "../../components/RaidBoss/RaidBossAvatar";
import RoleAvatar from "../../components/Role/RoleAvatar";
import {
  getRaidPosts,
  RaidBossDTO,
  RaidPostDTO,
  RoleDTO,
} from "../../services/gw2lfg-server/raid-post/getRaidPostsService";

interface RaidBossesProps {
  bosses: RaidBossDTO[];
}

export function RaidPostBosses(props: RaidBossesProps) {
  const { bosses } = props;
  const bossesToDisplay = bosses.slice(0, bosses.length);
  const hasMoreBosses = bosses.length > bossesToDisplay.length;
  return (
    <React.Fragment>
      {bossesToDisplay.map((boss, key) => (
        <RaidBossAvatar {...boss} key={key} />
      ))}
      {hasMoreBosses && <span>...</span>}
    </React.Fragment>
  );
}

interface RolesProps {
  roles: RoleDTO[];
}

export function RaidPostRoles(props: RolesProps) {
  const { roles } = props;
  return (
    <React.Fragment>
      {roles.map((role, key) => (
        <RoleAvatar {...role} key={key} />
      ))}
    </React.Fragment>
  );
}

interface RaidPostProps {
  raidPost: RaidPostDTO;
}

export function RaidPost(props: RaidPostProps) {
  const { raidPost } = props;
  const maxSpots = 10;
  const spotsTaken = maxSpots - raidPost.roles.length;

  return (
    <Accordion>
      <AccordionSummary>
        <Grid container>
          <Grid item xs={7} container direction="row">
            <RaidPostBosses bosses={raidPost.bosses} />
          </Grid>
          <Grid item xs={4} container direction="row">
            <RaidPostRoles roles={raidPost.roles} />
          </Grid>
          <Grid item xs>
            {spotsTaken} / {maxSpots}
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Box>{raidPost.description}</Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default function GetRaidPosts() {
  const page = 1;
  const { isLoading, error, data } = useQuery(`getRaidPostsOnPage${page}`, () =>
    getRaidPosts({ page })
  );

  if (isLoading) {
    return <div>Is loading...</div>;
  }

  if (error) {
    return <div>Error occured {error}</div>;
  }

  return (
    <Box>
      {data.map((raidPost) => (
        <RaidPost raidPost={raidPost} key={raidPost.id} />
      ))}
    </Box>
  );
}
