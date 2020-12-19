import { AccordionDetails, Box, Grid } from "@material-ui/core";
import React from "react";
import { RaidPostDTO } from "../../../services/gw2lfg-server/raid-post/getRaidPostsService";
import { RaidPostRolesDetails } from "./RaidPostRolesDetails";

interface RaidPostDetailsProps {
  raidPost: RaidPostDTO;
}

export default function RaidPostDetails(props: RaidPostDetailsProps) {
  const { raidPost } = props;

  return (
    <AccordionDetails>
      <Grid container direction="column">
        <Box mb={3}>{raidPost.description}</Box>
        <RaidPostRolesDetails
          roles={raidPost.roles}
          canUserJoin={raidPost.userMeetsRequirements}
        />
      </Grid>
    </AccordionDetails>
  );
}
