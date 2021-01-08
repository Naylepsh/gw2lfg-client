import { Box, createStyles, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import Gw2ItemAvatar from "../../../Gw2Item/Gw2ItemAvatar";

interface RaidPostFormRequirementOptionProps {
  id: string;
  name: string;
  onChange: any;
  value: number;
}

// Renders singular requirement options of an associated raid post form
export default function RaidPostFormRequirementOption(
  props: RaidPostFormRequirementOptionProps
) {
  const { id, name, onChange, value } = props;
  const classes = useStyles();

  // Simple TextField with an avatar icon acting as its pseudo-label
  return (
    <Box display="flex" alignItems="center" m={3}>
      <Gw2ItemAvatar name={name} />
      <TextField
        className={classes.textField}
        id={id}
        type="number"
        InputProps={{
          inputProps: {
            max: 100,
            min: 0,
          },
        }}
        defaultValue={value}
        onChange={onChange}
      />
    </Box>
  );
}

// CSS for RaidPostFormRequirementOption component
const useStyles = makeStyles(() =>
  createStyles({
    textField: {
      marginLeft: "15px",
      width: "60px",
    },
  })
);
