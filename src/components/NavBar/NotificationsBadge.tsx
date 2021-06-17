import {
  IconButton,
  Badge,
  Snackbar,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Alert } from "@material-ui/lab";
import React from "react";
import { useState } from "react";
import { useGetNewNotificationsQuery } from "../../hooks/queries/notifications/useGetNewNotificationsQuery";
import { NotificationDTO } from "../../services/gw2lfg-server/entities/NotificationDTO";

interface NotificationsBadgeProps {
  href: string;
  recipent: string;
}

export function NotificationsBadge(props: NotificationsBadgeProps) {
  const { recipent, href } = props;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [lastNotification, setLastNotification] =
    useState<NotificationDTO | null>(null);
  const { data } = useGetNewNotificationsQuery({
    recipent,
    key: "new-notifications",
  });

  if (data && data.notifications.length > 0) {
    if (!lastNotification) {
      setLastNotification(data.notifications[0]);
      setDate(new Date(data.notifications[0].createdAt));
    }

    const freshestNotificationDate = new Date(data.notifications[0].createdAt);
    if (
      lastNotification &&
      freshestNotificationDate > new Date(lastNotification.createdAt)
    ) {
      setLastNotification(data.notifications[0]);
      setOpen(true);
      setDate(freshestNotificationDate);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const freshNotifications = (data?.notifications ?? []).filter(
    (n) => new Date(n.createdAt) > date
  );
  const badgeContent =
    (data?.notifications.length ?? 0) + (data?.hasMore ? "+" : "");
  let snackbarContent = "";
  if (lastNotification) {
    snackbarContent += lastNotification.text;
  }
  if (freshNotifications.length > 1) {
    snackbarContent += `, and ${freshNotifications.length} more...`;
  }

  return (
    <>
      <IconButton aria-label="cart" href={href} color="inherit">
        <Badge badgeContent={badgeContent} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity="info" className={classes.snackbarContent}>
          {snackbarContent}
        </Alert>
      </Snackbar>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    snackbarContent: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    },
  })
);
