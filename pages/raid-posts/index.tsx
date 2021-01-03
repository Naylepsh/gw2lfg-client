import { Box, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "../../src/components/Loading/Loading";
import { RaidPost } from "../../src/components/RaidPost/RaidPost";
import { useGetRaidPostsQuery } from "../../src/hooks/queries/raid-posts/useGetRaidPostsQuery";
import { RaidPostDTO } from "../../src/services/gw2lfg-server/entities/RaidPostDTO";

export default function GetRaidPosts() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [prevRaidPosts, setPrevRaidPosts] = useState([] as RaidPostDTO[]);
  const {
    isLoading,
    isError,
    error,
    data,
    isPreviousData,
  } = useGetRaidPostsQuery(page);

  const currentRaidPosts = isPreviousData
    ? prevRaidPosts
    : [...prevRaidPosts, ...data.raidPosts];

  const loadMore = () => {
    setPage(page + 1);
    setPrevRaidPosts(currentRaidPosts);
  };

  const redirectToCreateNewPost = () => {
    router.push("/raid-posts/create");
  };

  if (isLoading) {
    return <Loading size="large" />;
  }

  if (isError) {
    console.log({ error });
    return <div>Error occured ...</div>;
  }

  return (
    <Box my={5}>
      <Box mb={1}>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={redirectToCreateNewPost}
        >
          <AddIcon />
          Create new post
        </Button>
      </Box>
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
