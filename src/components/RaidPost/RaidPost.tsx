import { Accordion } from "@material-ui/core";
import React from "react";
import { RaidPostDTO } from "../../services/gw2lfg-server/entities/RaidPostDTO";
import RaidPostDetails from "./Details/RaidPostDetails";
import RaidPostSummary from "./Summary/RaidPostSummary";

interface RaidPostProps {
  raidPost: RaidPostDTO;
}

export function RaidPost(props: RaidPostProps) {
  const { raidPost } = props;

  return (
    <Accordion>
      <RaidPostSummary raidPost={raidPost} />
      <RaidPostDetails raidPost={raidPost} />
    </Accordion>
  );
}
