import { makeStyles, createStyles, Button } from "@material-ui/core";
import { Box, Container, Paper } from "@material-ui/core";
import React from "react";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import { useUser } from "../../hooks/useUser";
import Loading from "../common/Loading/Loading";
import { useInfiniteGetNotificationsQuery } from "../../hooks/queries/notifications/useInfiniteGetNotificationsQuery";
import { NotificationList } from "../Notification/NotificationList";

export default function UserNotifications() {
  useIsAuthenticated();
  const { user, isLoading: isUserLoading, isError: isErrorOnUser } = useUser();

  const {
    isLoading: areNotificationsLoading,
    isError: isErrorOnNotifications,
    fetchMore,
    data,
  } = useInfiniteGetNotificationsQuery({ params: { recipent: user.username } });

  const classes = useStyles();

  const isLoading = isUserLoading || areNotificationsLoading;
  const isError = isErrorOnUser || isErrorOnNotifications;

  if (isLoading) return <Loading size="large" />;
  if (isError) return <div>Encountered error</div>;

  const notifications = data.map(({ notifications }) => notifications).flat();

  return (
    <Container maxWidth="sm" component={Paper} className={classes.container}>
      <Box my={3}>
        <NotificationList notifications={notifications} />
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

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      padding: "0",
    },
  })
);
