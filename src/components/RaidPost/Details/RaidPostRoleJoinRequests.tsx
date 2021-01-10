import {
  Box,
  Button,
  createStyles,
  Grid,
  Link,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { JoinRequestDTO } from "../../../services/gw2lfg-server/entities/joinRequestDTO";

interface RaidPostRoleJoinRequestsProps {
  joinRequests: JoinRequestDTO[];
}

export function RaidPostRoleJoinRequests(props: RaidPostRoleJoinRequestsProps) {
  const { joinRequests } = props;

  const classes = useStyles();

  return (
    <>
      {joinRequests.length > 0 ? (
        joinRequests.map((request, requestKey) => (
          <Grid key={requestKey} container direction="row">
            <Grid item xs={12} md={6} className={classes.requestsGridItem}>
              <Box my={3}>
                <Link href={`/users/${request.user.id}`} color="inherit">
                  {request.user.username}
                </Link>{" "}
                wants to join
              </Box>
            </Grid>
            <Grid item xs={12} md={6} className={classes.requestsGridItem}>
              <Box mx={3}>
                <Button color="primary" variant="contained">
                  ACCEPT
                </Button>
              </Box>
              <Box>
                <Button color="primary" variant="contained">
                  DECLINE
                </Button>
              </Box>
            </Grid>
          </Grid>
        ))
      ) : (
        <span>No join requests for this position</span>
      )}
    </>
  );
}

// CSS for RaidPostRolesDetails component
const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    requestsGridItem: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);
