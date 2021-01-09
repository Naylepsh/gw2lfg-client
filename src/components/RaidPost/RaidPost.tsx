import { Accordion } from "@material-ui/core";
import React, { useState } from "react";
import { RaidPostDTO } from "../../services/gw2lfg-server/entities/RaidPostDTO";
import RaidPostDetails from "./Details/RaidPostDetails";
import RaidPostSummary from "./Summary/RaidPostSummary";

interface RaidPostProps {
  raidPost: RaidPostDTO;
}

/*
Component for displaying a single raid post data.
Divided into two sections - summary and details.
By default only summary is shown. 
Details can be toggled by clicking anywhere on summary section.
*/
export function RaidPost(props: RaidPostProps) {
  const { raidPost } = props;

  const defaultDisplayedNumber = 8;
  const [numberOfBossesToDisplay, setNumberOfBosses] = useState(
    defaultDisplayedNumber
  );

  const changeNumberOfBosses = () => {
    setNumberOfBosses(
      numberOfBossesToDisplay === defaultDisplayedNumber
        ? raidPost.bosses.length
        : defaultDisplayedNumber
    );
  };

  return (
    <Accordion onChange={changeNumberOfBosses}>
      <RaidPostSummary
        raidPost={raidPost}
        maxNumberOfBosses={numberOfBossesToDisplay}
      />
      <RaidPostDetails raidPost={raidPost} />
    </Accordion>
  );
}
