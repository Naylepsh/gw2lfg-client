import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useGetJoinRequestsQuery } from "../../../../hooks/queries/join-requests/useGetJoinRequestsQuery";
import { useMeQuery } from "../../../../hooks/queries/users/useMeQuery";
import { JoinRequestDTO } from "../../../../services/gw2lfg-server/entities/joinRequestDTO";
import { RoleDTO } from "../../../../services/gw2lfg-server/entities/RoleDTO";
import { RaidPostRoleDetails } from "./RaidPostRoleDetails";
import { RaidPostRoleJoinRequests } from "./RaidPostRoleJoinRequests";

interface RaidPostRolesDetailsProps {
  postId: number;
  roles: RoleDTO[];
  displayJoinRequests: boolean;
}

/**
 * Renders detailed information on given raid post's roles and join requests.
 */
export function RaidPostRolesDetails(props: RaidPostRolesDetailsProps) {
  const { roles, postId, displayJoinRequests } = props;

  const { data: joinRequests } = useGetJoinRequestsQuery({
    postId,
  });
  const { isError: isMeError, data: me } = useMeQuery();
  const gotMe = !isMeError && me;

  const roleJoinRequests: Record<number, JoinRequestDTO[]> = {};
  const usersAcceptedSomeRole: Record<number, boolean> = {};
  if (joinRequests) {
    for (const request of joinRequests) {
      const roleId = request.role.id;
      if (!roleJoinRequests[roleId]) {
        roleJoinRequests[roleId] = [request];
      } else {
        roleJoinRequests[roleId].push(request);
      }

      if (request.status === "ACCEPTED") {
        usersAcceptedSomeRole[request.user.id] = true;
      }
    }
  }

  return (
    <Box>
      <Box my={3} display="flex" flexDirection="row" justifyContent="center">
        <Typography variant="h6">Roles</Typography>
      </Box>
      {roles.map((role, key) => {
        const thisRoleJoinRequests = roleJoinRequests[role.id] ?? [];
        const userJoinRequest =
          gotMe &&
          thisRoleJoinRequests.find((request) => request.user.id === me.id);

        return (
          <Accordion key={key}>
            <AccordionSummary>
              <RaidPostRoleDetails
                role={role}
                postId={postId}
                roleIdToCancel={userJoinRequest?.id}
                hasUserBeenAccepted={userJoinRequest?.status === "ACCEPTED"}
                canUserClickOnJoin={!!me}
              />
            </AccordionSummary>
            <AccordionDetails>
              <Container>
                {displayJoinRequests ? (
                  <RaidPostRoleJoinRequests
                    postId={postId}
                    joinRequests={roleJoinRequests[role.id] ?? []}
                    usersAcceptedSomeRole={{}}
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
        );
      })}
    </Box>
  );
}
