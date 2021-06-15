import { ListItem, ListItemText } from "@material-ui/core";
import { Box, Container, List, Paper, Divider } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useGetNotificationsQuery } from "../../hooks/queries/notifications/useGetNotificationsQuery";
import { useGetUserProfileQuery } from "../../hooks/queries/users/useGetUserProfileQuery";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import Loading from "../common/Loading/Loading";

export default function UserNotifications() {
  const router = useRouter();
  const { id } = router.query;

  useIsAuthenticated();

  const {
    isLoading: areNotificationsLoading,
    isError: isErrorOnNotifications,
    data,
  } = useGetNotificationsQuery({ recipent: "username1" }, 1);

  const {
    isLoading: isProfileLoading,
    isError: isErrorOnProfile,
    data: profile,
  } = useGetUserProfileQuery(id as string);
  const isLoading = isProfileLoading || areNotificationsLoading;
  const isError = isErrorOnProfile || isErrorOnNotifications;

  if (isLoading) return <Loading size="large" />;
  if (isError) return <div>Encountered error</div>;

  const { notifications } = data;
  console.log(notifications);

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
