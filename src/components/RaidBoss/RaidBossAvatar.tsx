import {
  Avatar,
  createStyles,
  makeStyles,
  Theme,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import { RaidBossDTO } from "../../services/gw2lfg-server/entities/RaidBossDTO";
import { bosses } from "./raidBosses.json";

interface RaidBossAvatarProps extends Omit<RaidBossDTO, "id"> {
  variant?: "square" | "circular";
}

/**
 * Renders a raid boss as an tooltip avatar
 */
function RaidBossAvatar(props: RaidBossAvatarProps) {
  const { name, isCm, variant } = props;
  const defaultVariant = "circular";
  const boss = bosses.find((boss) => boss.name == name);
  const title = boss.name + (isCm ? " (CM)" : "");
  const classes = useStyles();

  return boss ? (
    <Tooltip title={title}>
      <Avatar
        src={boss.portrait}
        alt={boss.name}
        variant={variant ?? defaultVariant}
        className={isCm && classes.cm}
      ></Avatar>
    </Tooltip>
  ) : null;
}

/**
 * CSS for RaidBossAvatar component
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cm: {
      borderWidth: 3,
      borderStyle: "solid",
      borderColor: theme.palette.secondary.main,
    },
  })
);

// Memoised RaidBossAvatar component, improves performance
export default React.memo(RaidBossAvatar);
