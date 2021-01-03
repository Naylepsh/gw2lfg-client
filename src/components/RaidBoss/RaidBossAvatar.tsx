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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cm: {
      borderWidth: 3,
      borderStyle: "solid",
      borderColor: theme.palette.secondary.main,
    },
  })
);

interface RaidBossAvatarProps extends Omit<RaidBossDTO, "id"> {
  variant?: 'square' | 'circle'
}

function RaidBossAvatar(props: RaidBossAvatarProps) {
  const { name, isCm, variant } = props;
  const defaultVariant = 'circle'
  const boss = bosses.filter((boss) => boss.name == name)[0];
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

export default React.memo(RaidBossAvatar);
