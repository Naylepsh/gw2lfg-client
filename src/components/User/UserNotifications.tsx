import { ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { Box, Container, List, Paper, Divider } from "@material-ui/core";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import React, { useState } from "react";
import { useGetNotificationsQuery } from "../../hooks/queries/notifications/useGetNotificationsQuery";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import { useUser } from "../../hooks/useUser";
import { NotificationDTO } from "../../services/gw2lfg-server/entities/NotificationDTO";
import Loading from "../common/Loading/Loading";

export default function UserNotifications() {
  useIsAuthenticated();

  const { user, isLoading: isUserLoading, isError: isErrorOnUser } = useUser();
  const {
    isLoading: areNotificationsLoading,
    isError: isErrorOnNotifications,
    data,
  } = useGetNotificationsQuery({ recipent: user.username }, 1);

  const [seen, setSeen] = useState<number[]>([]);

  const classes = useStyles();

  const isLoading = isUserLoading || areNotificationsLoading;
  const isError = isErrorOnUser || isErrorOnNotifications;

  if (isLoading) return <Loading size="large" />;
  if (isError) return <div>Encountered error</div>;

  const { notifications } = data;

  const markAsSeen = (notification: NotificationDTO, index: number) => {
    const updatedSeen = [...seen];
    updatedSeen.push(notification.id);
    setSeen(updatedSeen);
  };

  return (
    <Container
      maxWidth="sm"
      component={Paper}
      className={classes.container}
      key={seen.length}
    >
      <Box my={3}>
        <List>
          {notifications.map((notification, i) => {
            const text = parseText(notification.text);
            const date = new Date(notification.createdAt).toLocaleString();

            let className = "";
            const isSeen = seen.includes(notification.id) || notification.seen;
            if (isSeen) {
              className = classes.seenNotification;
            }

            const key = `${notification.id}-${isSeen}`;

            return (
              <React.Fragment key={key}>
                <ListItem className={className} key={key}>
                  <Box mr={2}>
                    {isSeen || (
                      <NotInterestedIcon
                        className={classes.markIcon}
                        onClick={() => markAsSeen(notification, i)}
                      />
                    )}
                  </Box>
                  <ListItemText primary={text} secondary={date} />
                </ListItem>
                {i < notifications.length - 1 && <Divider />}
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Container>
  );
}

function parseText(text: string) {
  return <span>{text.split(" ").map(parseChunk)}</span>;
}

function parseChunk(chunk: string, index: number) {
  if (chunk.toLowerCase().startsWith("user#")) {
    const id = chunk.slice(5);
    return (
      <a key={index} href={`/users/${id}`}>
        User#{id}
      </a>
    );
  }

  if (chunk.toLowerCase().startsWith("post#")) {
    const id = chunk.slice(5);
    return (
      <a key={index} href={`/raid-posts/${id}`}>
        Raid Post#{id}
      </a>
    );
  }

  return chunk + " ";
}

const useStyles = makeStyles(() => ({
  seenNotification: {
    background: "#e8ebed",
  },
  container: {
    padding: "0",
  },
  markIcon: {
    cursor: "pointer",
  },
}));
