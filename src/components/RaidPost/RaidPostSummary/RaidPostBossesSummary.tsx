import { Box } from "@material-ui/core";
import React from "react";
import { RaidBossDTO } from "../../../services/gw2lfg-server/entities/RaidBossDTO";
import RaidBossAvatar from "../../RaidBoss/RaidBossAvatar";

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
        <Box key={key} m={1}>
          <RaidBossAvatar {...boss} />
        </Box>
      ))}
      {hasMoreBosses && <span>...</span>}
    </React.Fragment>
  );
}
