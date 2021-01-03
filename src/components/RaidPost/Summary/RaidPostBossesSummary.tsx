import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import React from "react";
import { RaidBossDTO } from "../../../services/gw2lfg-server/entities/RaidBossDTO";
import RaidBossAvatar from "../../RaidBoss/RaidBossAvatar";

interface RaidPostBossesSummaryProps {
  bosses: RaidBossDTO[];
  max: number;
}

export function RaidPostBossesSummary(props: RaidPostBossesSummaryProps) {
  const { bosses, max } = props;
  // Material UI requires max to be at least 2
  const _max = max < 2 ? 2 : max;

  const styles = useStyles();

  return (
    <React.Fragment>
      <AvatarGroup max={_max} className={styles.bossesGroup}>
        {bosses.map((boss, key) => (
          <RaidBossAvatar key={key} {...boss} />
        ))}
      </AvatarGroup>
    </React.Fragment>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    bossesGroup: {
      flexWrap: "wrap",
    },
  })
);
