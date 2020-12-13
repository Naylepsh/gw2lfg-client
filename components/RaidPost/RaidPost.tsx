import { Accordion, AccordionDetails, Box } from "@material-ui/core";
import React from "react";
import { RaidPostDTO } from "../../services/gw2lfg-server/raid-post/getRaidPostsService";
import RaidPostSummary from "./RaidPostSummary/RaidPostSummary";

interface RaidPostProps {
  raidPost: RaidPostDTO;
}

export function RaidPost(props: RaidPostProps) {
  const { raidPost } = props;

  return (
    <Accordion>
      <RaidPostSummary raidPost={raidPost} />
      <AccordionDetails>
        <Box>{raidPost.description}</Box>
      </AccordionDetails>
    </Accordion>
  );
}
