import { createStyles, makeStyles } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import React from "react";
import { RaidBossDTO } from "../../../services/gw2lfg-server/entities/RaidBossDTO";
import RaidBossAvatar from "../../RaidBoss/RaidBossAvatar";

interface RaidPostBossesSummaryProps {
  bosses: RaidBossDTO[];
  max: number;
}

/**
 * Component for displaying raid bosses part of raid post.
 * Renders raid bosses as a group of avatars
 */
export function RaidPostBossesSummary(props: RaidPostBossesSummaryProps) {
  const { bosses, max } = props;

  /** max in an AvatarGroup component changes how many avatars will be displayed.
   * Everything after max will be reduced into singular numeric avatar,
   * where its value is the number of avatars past max.
   * Material UI requires max to be at least 2
   */
  const defaultMax = 2;
  const _max = Math.max(max, defaultMax);

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

/**
 * CSS for RaidPostBossesSummary component
 */
const useStyles = makeStyles(() =>
  createStyles({
    bossesGroup: {
      flexWrap: "wrap",
    },
  })
);
