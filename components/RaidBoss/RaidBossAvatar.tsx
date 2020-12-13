import { Avatar, Box } from "@material-ui/core";
import React from "react";
import { RaidBossDTO } from "../../services/gw2lfg-server/raid-post/getRaidPostsService";
import { bosses } from "./raidBosses.json";

interface RaidBossAvatarProps extends RaidBossDTO {}

export default function RaidBossAvatar(props: RaidBossAvatarProps) {
  const { name } = props;
  const bossVariants = bosses.filter((boss) => boss.name == name);
  const boss = bossVariants[0];
  return boss ? (
    <Box m={1}>
      <Avatar src={boss.portrait} alt={boss.name} variant="square" />
    </Box>
  ) : null;
}
