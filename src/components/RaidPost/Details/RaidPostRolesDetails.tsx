import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  createStyles,
  Grid,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useGetJoinRequestsQuery } from "../../../hooks/queries/join-requests/useGetJoinRequestsQuery";
import { JoinRequestDTO } from "../../../services/gw2lfg-server/entities/joinRequestDTO";
import { RoleDTO } from "../../../services/gw2lfg-server/entities/RoleDTO";
import { RaidPostRoleDetails } from "./RaidPostRoleDetails";

interface RaidPostRolesDetailsProps {
  postId: number;
  roles: RoleDTO[];
  canUserJoin: boolean;
  displayJoinRequests: boolean;
}

/* 
Renders detailed information on given raid post's roles and join requests.
*/
export function RaidPostRolesDetails(props: RaidPostRolesDetailsProps) {
  const { roles, canUserJoin, postId, displayJoinRequests } = props;

  const { isLoading, isError, data: joinRequests } = useGetJoinRequestsQuery({
    postId,
  });

  const roleJoinRequests: Record<number, JoinRequestDTO[]> = {};
  if (!isLoading && !isError) {
    for (const joinRequest of joinRequests) {
      const roleId = joinRequest.role.id;
      if (!roleJoinRequests[roleId]) {
        roleJoinRequests[roleId] = [joinRequest];
      } else {
        roleJoinRequests[roleId].push(joinRequest);
      }
    }
  }

  return (
    <Box>
      <Box my={3} display="flex" flexDirection="row" justifyContent="center">
        <Typography variant="h6">Roles</Typography>
      </Box>
      {roles.map((role, key) => (
        <Accordion key={key}>
          <AccordionSummary>
            <RaidPostRoleDetails
              role={role}
              canUserJoin={canUserJoin}
              postId={postId}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Container>
              {displayJoinRequests ? (
                <RaidPostRoleJoinRequests
                  joinRequests={roleJoinRequests[role.id] ?? []}
                />
              ) : (
                <span>
                  There are {(roleJoinRequests[role.id] ?? []).length} join
                  requests for this position
                </span>
              )}
            </Container>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

interface RaidPostRoleJoinRequestsProps {
  joinRequests: JoinRequestDTO[];
}

function RaidPostRoleJoinRequests(props: RaidPostRoleJoinRequestsProps) {
  const { joinRequests } = props;

  const classes = useStyles();

  return (
    <>
      {joinRequests.map((request, requestKey) => (
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
      ))}
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
