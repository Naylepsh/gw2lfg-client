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
import { useGetNotificationsQuery } from "../../hooks/queries/notifications/useGetNotificationsQuery";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import { useUser } from "../../hooks/useUser";
import { NotificationDTO } from "../../services/gw2lfg-server/entities/NotificationDTO";
import Loading from "../common/Loading/Loading";

export default function UserNotifications() {
  useIsAuthenticated();
  const { user, isLoading: isUserLoading, isError: isErrorOnUser } = useUser();

  const [page, setPage] = useState(1);
  const {
    isLoading: areNotificationsLoading,
    isError: isErrorOnNotifications,
    data,
  } = useGetNotificationsQuery({ recipent: user.username }, page);

  const [seen, setSeen] = useState<Record<number, boolean>>({});

  const classes = useStyles();

  const isLoading = isUserLoading || areNotificationsLoading;
  const isError = isErrorOnUser || isErrorOnNotifications;

  if (isLoading) return <Loading size="large" />;
  if (isError) return <div>Encountered error</div>;

  const { notifications } = data;

  const markAsSeen = (notification: NotificationDTO) => {
    const updatedSeen = { ...seen };
    updatedSeen[notification.id] = true;
    setSeen(updatedSeen);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <Container maxWidth="sm" component={Paper} className={classes.container}>
      <Box my={3}>
        <List>
          {notifications.map((notification, i) => {
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
          })}
        </List>
        {data?.hasMore && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={loadMore}
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
  })
);
