import { Box, Button, Container, Paper, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "../common/Loading/Loading";
import { RaidPost } from "./RaidPost";
import { useGetRaidPostsQuery } from "../../hooks/queries/raid-posts/useGetRaidPostsQuery";
import { RaidPostDTO } from "../../services/gw2lfg-server/entities/RaidPostDTO";
import { GetPostsQueryParams } from "../../services/gw2lfg-server/raid-posts/dtos/GetRaidPostsDTO";
import {
  ANY,
  GetRaidPostsFilterForm,
  ShowOption,
} from "./FilterForm/GetRaidPostsFilterForm";
import { useGetRaidBossesQuery } from "../../hooks/queries/raid-bosses/useGetRaidBossesQuery";
import { useUser } from "../../hooks/useUser";

interface QueryFormParams extends GetPostsQueryParams {
  showOption: ShowOption;
}

/**
 * Paginated Raid Posts component.
 * Gets posts from gw2lfg-server and displays them.
 */
export default function GetRaidPosts() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [queryFormParams, setQueryFormParams] = useState<QueryFormParams>({
    server: ANY,
    roleName: ANY,
    roleClass: ANY,
    bossesIds: [],
    showOption: "all",
    authorName: "",
  });
  const [prevRaidPosts, setPrevRaidPosts] = useState([] as RaidPostDTO[]);

  const { user } = useUser();
  const {
    isLoading: isLoadingPosts,
    isError: encouteredPostsError,
    error: postsError,
    data,
    isPreviousData,
  } = useGetRaidPostsQuery(
    formParamsToQueryParams(queryFormParams, user && user.id),
    page
  );
  const {
    isLoading: isLoadingBosses,
    isError: encouteredBossesError,
    error: bossesError,
    data: bosses,
  } = useGetRaidBossesQuery();

  if (isLoadingPosts || isLoadingBosses) {
    return <Loading size="large" />;
  }

  if (encouteredPostsError || encouteredBossesError) {
    console.log(postsError || bossesError);
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
          bosses={bosses}
          hideShowOption={!user}
        />
      </Box>
      {currentRaidPosts.length > 0 ? (
        currentRaidPosts.map((raidPost) => (
          <RaidPost raidPost={raidPost} key={raidPost.id} />
        ))
      ) : (
        <Container component={Paper}>
          <Box p={3} display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h5">No posts of were found ╥﹏╥</Typography>
          </Box>
        </Container>
      )}
      {data?.hasMore && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={loadMore}
        >
          Load more
        </Button>
      )}
    </Box>
  );
}

function formParamsToQueryParams(
  filterParams: QueryFormParams,
  userId?: number
) {
  const queryParams = { ...filterParams };

  if (userId) {
    if (
      queryParams.showOption === "applied" ||
      queryParams.showOption === "accepted"
    ) {
      queryParams.joinRequestAuthorId = userId.toString();
    }
    if (queryParams.showOption === "accepted") {
      queryParams.joinRequestStatus = "ACCEPTED";
    }
  }
  delete queryParams.showOption;

  for (const param in queryParams) {
    const queryValue = queryParams[param];
    const isAnyValue = queryValue === ANY;
    const isEmptyArray = Array.isArray(queryValue) && queryValue.length === 0;
    const isEmpty = !queryValue || isEmptyArray;

    if (isAnyValue || isEmpty) {
      delete queryParams[param];
    }
  }

  return queryParams;
}
