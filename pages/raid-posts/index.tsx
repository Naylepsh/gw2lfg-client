import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import { RaidPost } from "../../src/components/RaidPost/RaidPost";
import { useGetRaidPostsQuery } from "../../src/hooks/queries/raid-posts/useGetRaidPostsQuery";
import { RaidPostDTO } from "../../src/services/gw2lfg-server/entities/RaidPostDTO";

export default function GetRaidPosts() {
  const [page, setPage] = useState(1);
  const [prevRaidPosts, setPrevRaidPosts] = useState([] as RaidPostDTO[]);
  const {
    isLoading,
    isError,
    error,
    data,
    isPreviousData,
  } = useGetRaidPostsQuery(page);

  if (isLoading) {
    return <div>Is loading...</div>;
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
    <Box mt={5}>
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
