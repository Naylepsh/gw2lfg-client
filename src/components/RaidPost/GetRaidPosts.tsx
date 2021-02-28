import { Box, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "../common/Loading/Loading";
import { RaidPost } from "./RaidPost";
import { useGetRaidPostsQuery } from "../../hooks/queries/raid-posts/useGetRaidPostsQuery";
import { RaidPostDTO } from "../../services/gw2lfg-server/entities/RaidPostDTO";
import { GetPostsQueryParams } from "../../services/gw2lfg-server/raid-posts/dtos/GetRaidPostsDTO";
import { ANY, GetRaidPostsFilterForm } from "./GetRaidPostsFilterForm";

/**
 * Paginated Raid Posts component.
 * Gets posts from gw2lfg-server and displays them.
 */
export default function GetRaidPosts() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [queryFormParams, setQueryFormParams] = useState({
    server: ANY,
    roleName: ANY,
    roleClass: ANY,
    bossesIds: [],
  } as GetPostsQueryParams);
  const [prevRaidPosts, setPrevRaidPosts] = useState([] as RaidPostDTO[]);
  const {
    isLoading,
    isError,
    error,
    data,
    isPreviousData,
  } = useGetRaidPostsQuery(formParamsToQueryParams(queryFormParams), page);

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

  const redirectToCreateNewPostPage = () => {
    router.push("/raid-posts/create");
  };

  return (
    <Box my={5}>
      <Box mb={1}>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={redirectToCreateNewPostPage}
        >
          <AddIcon />
          Create new post
        </Button>
      </Box>
      <Box mb={1}>
        <GetRaidPostsFilterForm
          onSubmit={setQueryFormParams}
          initialValues={queryFormParams}
        />
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

function formParamsToQueryParams(filterParams: GetPostsQueryParams) {
  const queryParams = { ...filterParams };

  for (const param in queryParams) {
    const queryValue = queryParams[param];
    const isAnyValue = queryValue === ANY;
    const isEmptyArray = Array.isArray(queryValue) && queryValue.length === 0;

    if (isAnyValue || isEmptyArray) {
      delete queryParams[param];
    }
  }

  return queryParams;
}
