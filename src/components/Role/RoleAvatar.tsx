import {
  Avatar,
  createStyles,
  makeStyles,
  Theme,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import { RoleDTO } from "../../services/gw2lfg-server/entities/RoleDTO";
import { classes, roles } from "./roles.json";

interface RoleAvatarProps extends RoleDTO {
  size: "small" | "medium" | "large";
}

/**
 * Renders a role as a tooltip avatar
 */
export default function RoleAvatar(props: RoleAvatarProps) {
  const classes = useStyles();

  // Assigns RoleAvatar properties depends on whether passed role can be found in roles.json
  // If not, assigns default values from NullRole
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

class NullRole implements RoleDTO {
  name = "invalid";
  class = "invalid";
  portrait = "https://wiki.guildwars2.com/images/5/5a/Hints_Menu_Bar_icon.png";
}

/**
 * IMPORTANT! Result can also be undefined,
 * but for whatever reason TypeScript decides to ignore that.
 *  Even with explicitedly provided type, it still claims the result is always NOT undefined
 */
function findRoleByName(name: string) {
  const role = roles.find((role) => role.name === name);
  return role;
}

/**
 * IMPORTANT! Result can also be undefined.
 * Same reason as findRoleByName
 */
function findRoleByClass(roleClass: string) {
  const role = classes.find((role) => role.name === roleClass);
  return role;
}

/**
 * CSS for RoleAvatar component
 */
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
