import {
  ListItemText,
  List,
  ListItem,
  Divider,
  Container,
  Paper,
  Box,
  Typography,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useGetUserProfileQuery } from "../../hooks/queries/users/useGetUserProfileQuery";
import { useGetUserRaidClearStatusQuery } from "../../hooks/queries/users/useGetUserRaidClearStatusQuery";
import Loading from "../common/Loading/Loading";

export default function UserRaidClear() {
  const router = useRouter();
  const { id } = router.query;

  const {
    isLoading: isProfileLoading,
    isError: isErrorOnProfile,
    data: profile,
  } = useGetUserProfileQuery(id as string);
  const {
    isLoading: areItemsLoading,
    isError: isErrorOnItems,
    data: clearedBosses,
  } = useGetUserRaidClearStatusQuery(id as string);
  const isLoading = isProfileLoading || areItemsLoading;
  const isError = isErrorOnProfile || isErrorOnItems;

  if (isLoading) return <Loading size="large" />;
  if (isError) return <div>Encountered error</div>;

  return (
    <Container maxWidth="sm" component={Paper}>
      <Box my={3} py={3}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h6">
            Bosses cleared by {profile.user.username} since weekly reset
          </Typography>
        </Box>
        <List>
          {clearedBosses.map((bossName) => (
            <React.Fragment>
              <ListItem>
                <ListItemText primary={bossName} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
}
