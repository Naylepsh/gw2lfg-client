import { Box } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { getRaidPosts } from "../../services/gw2lfg-server/raid-post/getRaidPostsService";
import { RaidPost } from "../../components/RaidPost/RaidPost";

export default function GetRaidPosts() {
  const page = 1;
  const { isLoading, error, data } = useQuery(`getRaidPostsOnPage${page}`, () =>
    getRaidPosts({ page })
  );

  if (isLoading) {
    return <div>Is loading...</div>;
  }

  if (error) {
    return <div>Error occured {error}</div>;
  }

  return (
    <Box mt={5}>
      {data.map((raidPost) => (
        <RaidPost raidPost={raidPost} key={raidPost.id} />
      ))}
    </Box>
  );
}
