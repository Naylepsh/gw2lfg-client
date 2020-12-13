import React from "react";
import RaidBossAvatar from "../../RaidBoss/RaidBossAvatar";
import { RaidBossDTO } from "../../../services/gw2lfg-server/raid-post/getRaidPostsService";

interface RaidPostBossesSummaryProps {
  bosses: RaidBossDTO[];
}

export function RaidPostBossesSummary(props: RaidPostBossesSummaryProps) {
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
