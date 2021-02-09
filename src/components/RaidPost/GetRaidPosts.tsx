import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "../common/Loading/Loading";
import { RaidPost } from "./RaidPost";
import { useGetRaidPostsQuery } from "../../hooks/queries/raid-posts/useGetRaidPostsQuery";
import { RaidPostDTO } from "../../services/gw2lfg-server/entities/RaidPostDTO";
import { Form, Formik } from "formik";
import FormikSelect from "../common/inputs/FormikSelect";
import { GetPostsQueryParams } from "../../services/gw2lfg-server/raid-posts/dtos/GetRaidPostsDTO";
import MuiDateTimePicker from "../common/inputs/MuiDateTimePicker";

const ANY = "Any";

/* 
Paginated Raid Posts component.
Gets posts from gw2lfg-server and displays them.
*/
export default function GetRaidPosts() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [queryFormParams, setQueryFormParams] = useState({
    server: ANY,
  } as GetPostsQueryParams);
  const [prevRaidPosts, setPrevRaidPosts] = useState([] as RaidPostDTO[]);
  const {
    isLoading,
    isError,
    error,
    data,
    isPreviousData,
  } = useGetRaidPostsQuery(formParamsToQueryParams(queryFormParams), page);
  console.log(formParamsToQueryParams(queryFormParams).minDate);

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
    if (queryParams[param] === ANY) {
      delete queryParams[param];
    }
  }

  return queryParams;
}

interface GetRaidPostsFilterFormProps {
  onSubmit: any;
  initialValues: GetPostsQueryParams;
}

function GetRaidPostsFilterForm(props: GetRaidPostsFilterFormProps) {
  const { initialValues, onSubmit } = props;

  const servers = [
    { label: "Any", value: ANY },
    { label: "EU", value: "EU" },
    { label: "NA", value: "NA" },
  ];

  return (
    <Accordion>
      <AccordionSummary>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={1}
        >
          <Typography variant="h6">FILTER OPTIONS</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          {(formProps) => {
            const { handleChange, values } = formProps;

            return (
              <Box width={1}>
                <Form>
                  <Grid container justify="space-around">
                    <Grid item xs={12} sm={2}>
                      <FormikSelect
                        name="server"
                        items={servers}
                        label="Server"
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <MuiDateTimePicker
                        id="minDate"
                        label="Date"
                        value={values.minDate}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        label="Author's Name"
                        id="authorName"
                        onChange={handleChange}
                        value={values.authorName}
                      />
                    </Grid>
                  </Grid>
                  <Box mt={1}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Filter
                    </Button>
                  </Box>
                </Form>
              </Box>
            );
          }}
        </Formik>
      </AccordionDetails>
    </Accordion>
  );
}
