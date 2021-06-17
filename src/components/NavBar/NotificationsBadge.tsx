import { IconButton, Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React from "react";

interface NotificationsBadgeProps {
  href: string;
}

export function NotificationsBadge(props: NotificationsBadgeProps) {
  return (
    <IconButton aria-label="cart" href={props.href} color="inherit">
      <Badge badgeContent={4} color="secondary">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}
