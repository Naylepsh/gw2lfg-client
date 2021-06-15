import { ListItem, ListItemText } from "@material-ui/core";
import { Box, Container, List, Paper, Divider } from "@material-ui/core";
import { useRouter } from "next/router";
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

  const isLoading = isUserLoading || areNotificationsLoading;
  const isError = isErrorOnUser || isErrorOnNotifications;

  if (isLoading) return <Loading size="large" />;
  if (isError) return <div>Encountered error</div>;

  const { notifications } = data;

  return (
    <Container maxWidth="sm" component={Paper}>
      <Box my={3} py={3}>
        <List>
          {notifications.map((notification, i) => (
            <React.Fragment key={notification.id}>
              <ListItem>
                <ListItemText primary={notification.text} />
              </ListItem>
              {i < notifications.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
}
