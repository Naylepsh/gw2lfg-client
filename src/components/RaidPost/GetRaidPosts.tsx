import { Box, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "../common/Loading/Loading";
import { RaidPost } from "./RaidPost";
import { useGetRaidPostsQuery } from "../../hooks/queries/raid-posts/useGetRaidPostsQuery";
import { RaidPostDTO } from "../../services/gw2lfg-server/entities/RaidPostDTO";

/* 
Paginated Raid Posts component.
Gets posts from gw2lfg-server and displays them.
*/
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

  const redirectToCreateNewPost = () => {
    router.push("/raid-posts/create");
  };

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
