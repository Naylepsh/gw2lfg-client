import { Box } from "@material-ui/core";
import React from "react";
import { RaidPost } from "../../components/RaidPost/RaidPost";
import { useGetRaidPostsQuery } from "../../hooks/queries/raid-post/useGetRaidPostsQuery";

export default function GetRaidPosts() {
  const page = 1;
  const { isLoading, error, data } = useGetRaidPostsQuery(page)

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
