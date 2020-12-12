import { Avatar, Box } from "@material-ui/core";
import React from "react";
import { RaidBossDTO } from "../../services/gw2lfg-server/raid-post/getRaidPostsService";
import { bosses } from "./raidBosses.json";

interface RaidBossProps extends RaidBossDTO {}

class NullRaidBoss {
  name: "?";
  isCm: false;
  portrait: "";
}

export default function RaidBoss(props: RaidBossProps) {
  const { name } = props;
  const bossVariants = bosses.filter((boss) => boss.name == name);
  const boss = bossVariants.length > 0 ? bossVariants[0] : new NullRaidBoss();
  return (
    <Box m={1}>
      <Avatar src={boss.portrait} alt={boss.name} variant="square" />
    </Box>
  );
}
