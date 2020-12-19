import {
  Avatar,
  Box,
  createStyles,
  makeStyles,
  Theme,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import { RaidBossDTO } from "../../services/gw2lfg-server/raid-post/getRaidPostsService";
import { bosses } from "./raidBosses.json";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cm: {
      borderWidth: 3,
      borderStyle: "solid",
      borderColor: theme.palette.primary.main,
    },
  })
);

interface RaidBossAvatarProps extends RaidBossDTO {}

export default function RaidBossAvatar(props: RaidBossAvatarProps) {
  const { name, isCm } = props;
  const boss = bosses.filter((boss) => boss.name == name)[0];

  const classes = useStyles();
  return boss ? (
    <Box m={1}>
      <Tooltip title={boss.name}>
        <Avatar
          src={boss.portrait}
          alt={boss.name}
          variant="square"
          className={isCm && classes.cm}
        />
      </Tooltip>
    </Box>
  ) : null;
}
