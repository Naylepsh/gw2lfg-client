import { Box, TextField } from "@material-ui/core";
import React from "react";
import Gw2ItemAvatar from "../../Gw2Item/Gw2ItemAvatar";

interface RaidPostFormRequirementOptionProps {
  id: string;
  name: string;
  onChange: any;
}

export default function RaidPostFormRequirementOption(
  props: RaidPostFormRequirementOptionProps
) {
  return (
    <Box display="flex" alignItems="center">
      <Gw2ItemAvatar name={props.name} />
      <TextField
        id={props.id}
        type="number"
        InputProps={{
          inputProps: {
            max: 100,
            min: 0,
          },
        }}
        onChange={props.onChange}
      />
    </Box>
  );
}
