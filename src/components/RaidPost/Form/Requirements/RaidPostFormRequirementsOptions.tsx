import {
  createStyles,
  FormControl,
  FormLabel,
  FormGroup,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import gw2itemsInfo from "../../../Gw2Item/gw2items.json";
import RaidPostFormRequirementOption from "./RaidPostFormRequirementOption";

interface RaidPostFormRequirementsOptionsProps {
  requirementsId: string;
  itemsId: string;
}

/**
 * Renders requirements options of an associated raid post form
 */
export function RaidPostFormRequirementsOptions(
  props: RaidPostFormRequirementsOptionsProps
) {
  const { requirementsId, itemsId } = props;

  const classes = useStyles();

  const requirements = getKnownItems();

  return (
    <FormControl className={classes.formControl}>
      <FormLabel component="legend">Requirements</FormLabel>
      <FormGroup className={classes.formGroup}>
        {requirements.map((requirement) => (
          <RaidPostFormRequirementOption
            {...requirement}
            key={requirement.name}
            id={`${requirementsId}.${itemsId}.${requirement.name}`}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

// Memoised component, improves the performance
export default React.memo(RaidPostFormRequirementsOptions);

/**
 * Gets list of item names from stored gw2items.json file
 */
export function getKnownItems() {
  const itemNames = Object.keys(gw2itemsInfo.items);
  return itemNames.map((name) => ({ name }));
}

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      margin: "30px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
  })
);
