import { Box, Container, Paper, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import Loading from "../common/Loading/Loading";
import { RaidPost } from "./RaidPost";
import { useGetRaidPostQuery } from "../../hooks/queries/raid-posts/useGetRaidPostQuery";

/**
 * Raid Post component.
 * Gets post of given id from gw2lfg-server and displays it.
 */
export default function GetRaidPost() {
  const router = useRouter();
  const {
    isLoading,
    isError,
    error,
    data: raidPost,
  } = useGetRaidPostQuery(router.query["id"] as string);

  if (isLoading) {
    return <Loading size="large" />;
  }

  if (isError) {
    if (error["response"]["status"] === 404) {
      return (
        <Container component={Paper}>
          <Box p={3} display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h5">
              This post could not be found ╥﹏╥
            </Typography>
          </Box>
        </Container>
      );
    } else {
      return <div>Encountered error...</div>;
    }
  }

  return (
    <Box my={5}>
      <RaidPost raidPost={raidPost} key={raidPost.id} />
    </Box>
  );
}
