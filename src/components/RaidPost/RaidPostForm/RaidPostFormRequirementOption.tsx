import { Box, createStyles, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import Gw2ItemAvatar from "../../Gw2Item/Gw2ItemAvatar";

const useStyles = makeStyles(() =>
  createStyles({
    textField: {
      marginLeft: "15px",
      width: "60px",
    },
  })
);

interface RaidPostFormRequirementOptionProps {
  id: string;
  name: string;
  onChange: any;
}

export default function RaidPostFormRequirementOption(
  props: RaidPostFormRequirementOptionProps
) {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Gw2ItemAvatar name={props.name} />
      <TextField
        className={classes.textField}
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
