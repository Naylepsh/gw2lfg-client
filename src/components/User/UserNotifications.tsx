import {
  ListItem,
  ListItemText,
  makeStyles,
  createStyles,
  Button,
} from "@material-ui/core";
import { Box, Container, List, Paper, Divider } from "@material-ui/core";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import React, { useState } from "react";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import { useUser } from "../../hooks/useUser";
import { NotificationDTO } from "../../services/gw2lfg-server/entities/NotificationDTO";
import Loading from "../common/Loading/Loading";
import { useInfiniteGetNotificationsQuery } from "../../hooks/queries/notifications/useInfiniteGetNotificationsQuery";
import updateNotification from "../../services/gw2lfg-server/notifications/updateNotificationService";

export default function UserNotifications() {
  useIsAuthenticated();
  const { user, isLoading: isUserLoading, isError: isErrorOnUser } = useUser();

  const {
    isLoading: areNotificationsLoading,
    isError: isErrorOnNotifications,
    fetchMore,
    data,
  } = useInfiniteGetNotificationsQuery({ params: { recipent: user.username } });

  const [seen, setSeen] = useState<Record<number, boolean>>({});

  const classes = useStyles();

  const isLoading = isUserLoading || areNotificationsLoading;
  const isError = isErrorOnUser || isErrorOnNotifications;

  if (isLoading) return <Loading size="large" />;
  if (isError) return <div>Encountered error</div>;

  const markAsSeen = async (notification: NotificationDTO) => {
    const updatedSeen = { ...seen };
    updatedSeen[notification.id] = true;
    setSeen(updatedSeen);
    try {
      const res = await updateNotification({ id: notification.id, seen: true });
      console.log(res);
    } catch (error) {
      setSeen({ ...updatedSeen, [notification.id]: false });
    }
  };

  return (
    <Container maxWidth="sm" component={Paper} className={classes.container}>
      <Box my={3}>
        <List className={classes.list}>
          {data.map(({ notifications }) =>
            notifications.map((notification, i) => {
              const text = parseText(notification.text);
              const date = new Date(notification.createdAt).toLocaleString();

              const isSeen = seen[notification.id] || notification.seen;
              const className = isSeen ? classes.seenNotification : "";

              return (
                <React.Fragment key={notification.id}>
                  <ListItem className={className}>
                    <Box mr={2}>
                      {isSeen ? (
                        <></>
                      ) : (
                        <NotInterestedIcon
                          className={classes.markIcon}
                          onClick={() => markAsSeen(notification)}
                        />
                      )}
                    </Box>
                    <ListItemText primary={text} secondary={date} />
                  </ListItem>
                  {i < notifications.length - 1 && <Divider />}
                </React.Fragment>
              );
            })
          )}
        </List>
        {data[data.length - 1].hasMore && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => fetchMore()}
          >
            Load more
          </Button>
        )}
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
        User#{id}{" "}
      </a>
    );
  }

  if (chunk.toLowerCase().startsWith("post#")) {
    const id = chunk.slice(5);
    return (
      <a key={index} href={`/raid-posts/${id}`}>
        Raid Post#{id}{" "}
      </a>
    );
  }

  return chunk + " ";
}

const useStyles = makeStyles(() =>
  createStyles({
    seenNotification: {
      background: "#e8ebed",
    },
    container: {
      padding: "0",
    },
    markIcon: {
      cursor: "pointer",
    },
    list: {
      padding: "0",
    },
  })
);
