import {
  Box,
  Avatar,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { RoleDTO } from "../../services/gw2lfg-server/raid-post/getRaidPostsService";
import { roles } from "./roles.json";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
);

class NullRole implements RoleDTO {
  name = "invalid";
  portrait = "https://wiki.guildwars2.com/images/5/5a/Hints_Menu_Bar_icon.png";
}

interface RoleAvatarProps extends RoleDTO {}

export default function RoleAvatar(props: RoleAvatarProps) {
  const classes = useStyles();

  const name = props.name.toLowerCase();
  const roleVariants = roles.filter((role) => role.name === name);
  const role = roleVariants[0] ?? new NullRole();
  console.log(role);
  return (
    <Box my={1} className={classes.root}>
      <Avatar
        src={role.portrait}
        alt={role.name}
        variant="square"
        className={classes.small}
      />
    </Box>
  );
}
