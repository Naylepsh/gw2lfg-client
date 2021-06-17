import { IconButton, Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React from "react";
import { useGetNewNotificationsQuery } from "../../hooks/queries/notifications/useGetNewNotificationsQuery";

interface NotificationsBadgeProps {
  href: string;
  recipent: string;
}

export function NotificationsBadge(props: NotificationsBadgeProps) {
  const { recipent, href } = props;
  const { data } = useGetNewNotificationsQuery({
    recipent,
    key: "new-notifications",
  });

  const newNotifications = data?.notifications.length ?? 0;
  const badgeContent = newNotifications + (data?.hasMore ? "+" : "");

  return (
    <IconButton aria-label="cart" href={href} color="inherit">
      <Badge badgeContent={badgeContent} color="secondary">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}
