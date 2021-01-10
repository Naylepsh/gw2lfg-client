import {
  Box,
  Button,
  createStyles,
  Grid,
  Link,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import { useAcceptJoinRequestMutation } from "../../../hooks/mutations/join-requests/useAcceptJoinRequestMutation";
import { useDeleteJoinRequestMutation } from "../../../hooks/mutations/join-requests/useDeleteJoinRequestMutation";
import { JoinRequestDTO } from "../../../services/gw2lfg-server/entities/joinRequestDTO";
import LoadingButton from "../../common/buttons/LoadingButton";

interface RaidPostRoleJoinRequestsProps {
  joinRequests: JoinRequestDTO[];
}

/*
Renders join requests of a given role.
Handles accepting and rejecting of requests.
*/
export function RaidPostRoleJoinRequests(props: RaidPostRoleJoinRequestsProps) {
  const { joinRequests } = props;

  const [acceptJoinRequest] = useAcceptJoinRequestMutation();
  const [deleteJoinRequest] = useDeleteJoinRequestMutation();

  // sort join requests by status
  joinRequests.sort((request, _) => (request.status === "ACCEPTED" ? 1 : 0));

  const acceptedRequest = joinRequests.find(
    (request) => request.status === "ACCEPTED"
  );
  const [hasAcceptedRequest, setHasAcceptedRequest] = useState(
    !!acceptedRequest
  );

  // logic for clicking on ACCEPT button
  const handleAccept = async (requestId: number) => {
    try {
      await acceptJoinRequest({ id: requestId });
      setHasAcceptedRequest(true);
    } catch (error) {
      console.log(error);
    }
  };

  // logic for clicking on DECLINE button
  const handleDecline = async (requestId: number) => {
    try {
      await deleteJoinRequest({ id: requestId });
    } catch (error) {
      console.log(error);
    }
  };

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
                <span> status: {request.status}</span>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} className={classes.requestsGridItem}>
              {!hasAcceptedRequest && (
                <Box mx={3}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleAccept(request.id)}
                  >
                    ACCEPT
                  </Button>
                </Box>
              )}
              <Box>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => handleDecline(request.id)}
                >
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
