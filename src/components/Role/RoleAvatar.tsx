import {
  Tooltip,
  Avatar,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { RoleDTO } from "../../services/gw2lfg-server/entities/RoleDTO";
import { roles, classes } from "./roles.json";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    medium: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
);

class NullRole implements RoleDTO {
  name = "invalid";
  class = "invalid";
  portrait = "https://wiki.guildwars2.com/images/5/5a/Hints_Menu_Bar_icon.png";
}

interface RoleAvatarProps extends RoleDTO {
  size: "small" | "medium" | "large";
}

export default function RoleAvatar(props: RoleAvatarProps) {
  const classes = useStyles();

  const name = props.name.toLowerCase();
  const roleClass = props.class.toLowerCase();
  const roleFound =
    roleClass === "any" ? findRoleByName(name) : findRoleByClass(roleClass);
  const role = roleFound ?? new NullRole();
  const roleTitle = `${name} ${roleClass}`;

  return (
    <Tooltip title={roleTitle}>
      <Avatar
        src={role.portrait}
        alt={role.name}
        variant="square"
        className={classes[props.size]}
      />
    </Tooltip>
  );
}

function findRoleByName(name: string) {
  const roleVariants = roles.filter((role) => role.name === name);
  const role = roleVariants[0];
  return role;
}

function findRoleByClass(roleClass: string) {
  const roleVariants = classes.filter((role) => role.name === roleClass);
  const role = roleVariants[0];
  return role;
}
