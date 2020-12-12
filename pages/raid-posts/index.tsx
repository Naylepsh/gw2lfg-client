import { Box, Grid } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
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
  const bossesToDisplay = bosses.slice(0, 5);
  const hasMoreBosses = bosses.length > bossesToDisplay.length;
  const suffix = hasMoreBosses ? "..." : "";
  return (
    <span>{bossesToDisplay.map((boss) => boss.name).join(", ") + suffix}</span>
  );
}

interface RolesProps {
  roles: RoleDTO[];
}

export function RaidPostRoles(props: RolesProps) {
  const { roles } = props;
  return <span>{roles.map((role) => role.name).join(", ")}</span>;
}

interface RaidPostProps {
  raidPost: RaidPostDTO;
}

export function RaidPost(props: RaidPostProps) {
  const { raidPost } = props;
  const maxSpots = 10;
  const spotsTaken = maxSpots - raidPost.roles.length;

  return (
    <Box>
      <Grid container>
        <Grid item xs={7}>
          <RaidPostBosses bosses={raidPost.bosses} />
        </Grid>
        <Grid item xs={4}>
          <RaidPostRoles roles={raidPost.roles} />
        </Grid>
        <Grid item xs>
          {spotsTaken} / {maxSpots}
        </Grid>
      </Grid>
    </Box>
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
  console.log(data);

  return (
    <Box>
      {data.map((raidPost) => (
        <RaidPost raidPost={raidPost} />
      ))}
    </Box>
  );
}
