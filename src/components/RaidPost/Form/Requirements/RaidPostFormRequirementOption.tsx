import { Box, createStyles, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import Gw2ItemAvatar from "../../../Gw2Item/Gw2ItemAvatar";

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
  value: number;
}

export default function RaidPostFormRequirementOption(
  props: RaidPostFormRequirementOptionProps
) {
  const { id, name, onChange, value } = props;
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
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
