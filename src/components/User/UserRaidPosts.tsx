import { Box, Button, Typography, Container, Paper } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "../common/Loading/Loading";
import { RaidPostDTO } from "../../services/gw2lfg-server/entities/RaidPostDTO";
import { RaidPost } from "../RaidPost/RaidPost";
import { useGetUserRaidPostsQuery } from "../../hooks/queries/users/useGetUserRaidPostsQuery";
import { useGetUserProfileQuery } from "../../hooks/queries/users/useGetUserProfileQuery";

/**
 * Paginated User Raid Posts component.
 * Gets posts of a user from gw2lfg-server and displays them.
 */
export default function UserRaidPosts() {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState(1);
  const [prevRaidPosts, setPrevRaidPosts] = useState([] as RaidPostDTO[]);
  const {
    isLoading: areUserPostsLoading,
    isError: hasUserPostFailed,
    error,
    data: userPosts,
    isPreviousData,
  } = useGetUserRaidPostsQuery(id as string, page);
  const {
    isLoading: isUserLoading,
    isError: hasUserProfileFailed,
    data: profile,
  } = useGetUserProfileQuery(id as string);

  const isLoading = areUserPostsLoading || isUserLoading;
  if (isLoading) {
    return <Loading size="large" />;
  }

  const isError = hasUserPostFailed || hasUserProfileFailed;
  if (isError) {
    console.log({ error });
    return <div>Error occured ...</div>;
  }

  const currentRaidPosts = isPreviousData
    ? prevRaidPosts
    : [...prevRaidPosts, ...userPosts.raidPosts];

  const loadMore = () => {
    setPage(page + 1);
    setPrevRaidPosts(currentRaidPosts);
  };

  return (
    <Container disableGutters component={Paper}>
      <Box my={3} pt={3}>
        <Box mb={3} display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h6">
            {profile.user.username}'s raid posts
          </Typography>
        </Box>
        {currentRaidPosts.map((raidPost) => (
          <RaidPost raidPost={raidPost} key={raidPost.id} />
        ))}
        {userPosts?.hasMore && (
          <Button
            variant="contained"
            color="secondary"
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
