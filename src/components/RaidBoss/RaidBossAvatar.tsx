import {
  Avatar,
  Box,
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

interface RaidBossAvatarProps extends Omit<RaidBossDTO, "id"> {}

function RaidBossAvatar(props: RaidBossAvatarProps) {
  const { name, isCm } = props;
  const boss = bosses.filter((boss) => boss.name == name)[0];
  const title = boss.name + (isCm ? " (CM)" : "");

  const classes = useStyles();
  return boss ? (
    <Box m={1}>
      <Tooltip title={title}>
        <Avatar
          src={boss.portrait}
          alt={boss.name}
          variant="square"
          className={isCm && classes.cm}
        ></Avatar>
      </Tooltip>
    </Box>
  ) : null;
}

export default React.memo(RaidBossAvatar);
