import { ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { Box, Container, List, Paper, Divider } from "@material-ui/core";
import React from "react";
import { useGetNotificationsQuery } from "../../hooks/queries/notifications/useGetNotificationsQuery";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import { useUser } from "../../hooks/useUser";
import Loading from "../common/Loading/Loading";

export default function UserNotifications() {
  useIsAuthenticated();

  const { user, isLoading: isUserLoading, isError: isErrorOnUser } = useUser();
  const {
    isLoading: areNotificationsLoading,
    isError: isErrorOnNotifications,
    data,
  } = useGetNotificationsQuery({ recipent: user.username }, 1);

  const classes = useStyles();

  const isLoading = isUserLoading || areNotificationsLoading;
  const isError = isErrorOnUser || isErrorOnNotifications;

  if (isLoading) return <Loading size="large" />;
  if (isError) return <div>Encountered error</div>;

  const { notifications } = data;

  return (
    <Container maxWidth="sm" component={Paper} className={classes.container}>
      <Box my={3}>
        <List>
          {notifications.map((notification, i) => {
            const text = parseText(notification.text);

            return (
              <React.Fragment key={notification.id}>
                <ListItem className={classes.seenNotification}>
                  <ListItemText primary={text} />
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

function parseChunk(chunk: string) {
  if (chunk.toLowerCase().startsWith("user#")) {
    const id = chunk.slice(5);
    return <a href={`/users/${id}`}>User#{id}</a>;
  }

  if (chunk.toLowerCase().startsWith("post#")) {
    const id = chunk.slice(5);
    return <a href={`/raid-posts/${id}`}>Raid Post#{id}</a>;
  }

  return chunk + " ";
}

const useStyles = makeStyles(() => ({
  seenNotification: {
    background: "#f6f8fa",
  },
  container: {
    padding: "0",
  },
}));
