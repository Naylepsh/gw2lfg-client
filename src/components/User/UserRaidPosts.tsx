import { Box, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "../common/Loading/Loading";
import { RaidPostDTO } from "../../services/gw2lfg-server/entities/RaidPostDTO";
import { RaidPost } from "../RaidPost/RaidPost";
import { useGetUserRaidPostsQuery } from "../../hooks/queries/users/useGetUserRaidPostsQuery";

/* 
Paginated User Raid Posts component.
Gets posts of a user from gw2lfg-server and displays them.
*/
export default function UserRaidPosts() {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState(1);
  const [prevRaidPosts, setPrevRaidPosts] = useState([] as RaidPostDTO[]);
  const {
    isLoading,
    isError,
    error,
    data,
    isPreviousData,
  } = useGetUserRaidPostsQuery(id as string, page);

  if (isLoading) {
    return <Loading size="large" />;
  }

  if (isError) {
    console.log({ error });
    return <div>Error occured ...</div>;
  }

  const currentRaidPosts = isPreviousData
    ? prevRaidPosts
    : [...prevRaidPosts, ...data.raidPosts];

  const loadMore = () => {
    setPage(page + 1);
    setPrevRaidPosts(currentRaidPosts);
  };

  return (
    <Box my={5}>
      {currentRaidPosts.map((raidPost) => (
        <RaidPost raidPost={raidPost} key={raidPost.id} />
      ))}
      {data?.hasMore && (
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
  );
}
