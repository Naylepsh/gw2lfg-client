import { AccordionDetails, Box, Grid } from "@material-ui/core";
import React from "react";
import { RaidPostDTO } from "../../../services/gw2lfg-server/entities/RaidPostDTO";
import { RaidPostRolesDetails } from "./RaidPostRolesDetails";

interface RaidPostDetailsProps {
  raidPost: RaidPostDTO;
}

// Renders description and role of a given raid post
export default function RaidPostDetails(props: RaidPostDetailsProps) {
  const { raidPost } = props;

  return (
    <AccordionDetails>
      <Grid container direction="column">
        <Box mb={3}>{raidPost.description}</Box>
        <RaidPostRolesDetails
          postId={raidPost.id}
          roles={raidPost.roles}
          canUserJoin={raidPost.userMeetsRequirements}
        />
      </Grid>
    </AccordionDetails>
  );
}
