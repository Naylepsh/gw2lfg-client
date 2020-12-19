import { Box } from "@material-ui/core";
import React from "react";
import { RaidPost } from "../../src/components/RaidPost/RaidPost";
import { useGetRaidPostsQuery } from "../../src/hooks/queries/raid-post/useGetRaidPostsQuery";

export default function GetRaidPosts() {
  const page = 1;
  const { isLoading, isError, error, data } = useGetRaidPostsQuery(page);

  if (isLoading) {
    return <div>Is loading...</div>;
  }

  if (isError) {
    console.log({ error });
    return <div>Error occured ...</div>;
  }

  return (
    <Box mt={5}>
      {data.map((raidPost) => (
        <RaidPost raidPost={raidPost} key={raidPost.id} />
      ))}
    </Box>
  );
}
