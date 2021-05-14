import { Box, createStyles, makeStyles } from "@material-ui/core";
import { Field } from "formik";
import { TextField, TextFieldProps } from "formik-material-ui";
import React from "react";
import Gw2ItemAvatar from "../../../Gw2Item/Gw2ItemAvatar";

interface RaidPostFormRequirementOptionProps {
  id: string;
  name: string;
}

/**
 * Renders singular requirement options of an associated raid post form
 */
export default function RaidPostFormRequirementOption(
  props: RaidPostFormRequirementOptionProps
) {
  const { id, name } = props;

  // Simple TextField with an avatar icon acting as its pseudo-label
  return (
    <Box display="flex" alignItems="center" m={3}>
      <Gw2ItemAvatar name={name} />
      <Field
        component={MemoisedRequirementTextField}
        label=""
        id={id}
        name={id}
      />
    </Box>
  );
}

function RequirementTextField(props: TextFieldProps) {
  const classes = useStyles();

  return (
    <TextField
      {...props}
      className={classes.textField}
      type="number"
      inputProps={{ min: 0 }}
      defaultValue={0}
    />
  );
}

const MemoisedRequirementTextField = React.memo(
  RequirementTextField,
  (prevProps, nextProps) => prevProps.field.value === nextProps.field.value
);

/**
 * CSS for RaidPostFormRequirementOption component
 */
const useStyles = makeStyles(() =>
  createStyles({
    textField: {
      marginLeft: "15px",
      width: "60px",
    },
  })
);
