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
}

/* 
Renders detailed information on given raid post's roles in a table format
*/
export function RaidPostRolesDetails(props: RaidPostRolesDetailsProps) {
  const { roles, canUserJoin, postId } = props;

  const classes = useStyles();

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
              {(roleJoinRequests[role.id] ?? []).map((request, requestKey) => (
                <Grid key={requestKey} container direction="row">
                  <Grid item className={classes.requestsGridItem}>
                    <Box>
                      <Link href={`/users/${request.user.id}`} color="inherit">
                        {request.user.username}
                      </Link>{" "}
                      wants to join
                    </Box>
                  </Grid>
                  <Grid item className={classes.requestsGridItem}>
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
            </Container>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
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
