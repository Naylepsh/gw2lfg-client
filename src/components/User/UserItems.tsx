import { Box, Container, Paper, Typography, Divider } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useGetUserItemsQuery } from "../../hooks/queries/users/useGetUserItemsQuery";
import { useGetUserProfileQuery } from "../../hooks/queries/users/useGetUserProfileQuery";
import Loading from "../common/Loading/Loading";
import Gw2ItemAvatar from "../Gw2Item/Gw2ItemAvatar";

/*
Renders items of a user with id given by the route query.
*/

export default function UserItems() {
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
    data: items,
  } = useGetUserItemsQuery(id as string);
  const isLoading = isProfileLoading || areItemsLoading;
  const isError = isErrorOnProfile || isErrorOnItems;

  if (isLoading) return <Loading size="large" />;
  if (isError) return <div>Encountered error</div>;

  return (
    <Container component={Paper} maxWidth="md">
      <Box my={3} py={3}>
        <Box mb={1} display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h6">
            {profile.user.username}'s items in possession
          </Typography>
        </Box>
        <Divider />
        <Box
          display="flex"
          flexDirection="row"
          width="100%"
          flexWrap="wrap"
          justifyContent="space-around"
        >
          {items.map((item) => (
            <Box
              key={item.name}
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              mx={1}
              my={2}
            >
              <Gw2ItemAvatar name={item.name} />
              <Box fontSize={24} ml={1}>
                x{item.quantity}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
