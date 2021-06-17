import { makeStyles, createStyles } from "@material-ui/core";
import { List, Divider } from "@material-ui/core";
import React, { useState } from "react";
import { NotificationDTO } from "../../services/gw2lfg-server/entities/NotificationDTO";
import updateNotification from "../../services/gw2lfg-server/notifications/updateNotificationService";
import { Notification } from "./Notification";

interface NotificationListProps {
  notifications: NotificationDTO[];
}

export function NotificationList(props: NotificationListProps) {
  const { notifications } = props;
  const [seen, setSeen] = useState<Record<number, boolean>>({});
  const classes = useStyles();

  const markAsSeen = async (notification: NotificationDTO) => {
    const updatedSeen = { ...seen };
    updatedSeen[notification.id] = true;
    setSeen(updatedSeen);
    try {
      await updateNotification({ id: notification.id, seen: true });
    } catch (error) {
      setSeen({ ...updatedSeen, [notification.id]: false });
    }
  };

  return (
    <List className={classes.list}>
      {notifications.map((notification, i) => {
        const isSeen = seen[notification.id] || notification.seen;

        return (
          <React.Fragment key={notification.id}>
            <Notification
              notification={notification}
              isSeen={isSeen}
              markAsSeen={markAsSeen}
            />
            {i < notifications.length - 1 && <Divider />}
          </React.Fragment>
        );
      })}
    </List>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    list: {
      padding: "0",
    },
  })
);
