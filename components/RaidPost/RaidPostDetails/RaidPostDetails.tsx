import { AccordionDetails, Box } from "@material-ui/core";
import React from "react";
import { RaidPostDTO } from "../../../services/gw2lfg-server/raid-post/getRaidPostsService";

interface RaidPostDetailsProps {
  raidPost: RaidPostDTO;
}

export default function RaidPostDetails(props: RaidPostDetailsProps) {
  const { raidPost } = props;

  return (
    <AccordionDetails>
      <Box>{raidPost.description}</Box>
    </AccordionDetails>
  );
}
