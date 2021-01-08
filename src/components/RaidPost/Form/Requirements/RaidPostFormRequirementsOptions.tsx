import { Box, Typography } from "@material-ui/core";
import React from "react";
import { items } from "../../../Gw2Item/gw2items.json";
import RaidPostFormRequirementOption from "./RaidPostFormRequirementOption";

interface RaidPostFormRequirementsOptionsProps {
  requirementsId: string;
  itemsId: string;
  onChange: any;
  values: { [key: string]: number };
}

// Renders requirements options of an associated raid post form
export function RaidPostFormRequirementsOptions(
  props: RaidPostFormRequirementsOptionsProps
) {
  const { requirementsId, itemsId, onChange, values } = props;

  const requirements = getKnownItems();

  return (
    <Box
      my={3}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h6">Requirements</Typography>
      <Box
        display="flex"
        flexDirection="row"
        width="100%"
        flexWrap="wrap"
        justifyContent="space-around"
      >
        {requirements.map((requirement) => (
          <RaidPostFormRequirementOption
            {...requirement}
            key={requirement.name}
            id={`${requirementsId}.${itemsId}.${requirement.name}`}
            onChange={onChange}
            value={values[requirement.name] ?? 0}
          />
        ))}
      </Box>
    </Box>
  );
}

// Gets list of item names from stored gw2items.json file
export function getKnownItems() {
  const itemNames = Object.keys(items);
  return itemNames.map((name) => ({ name }));
}

// Memoised RaidPostFormRequirementsOptions component, improves the performance
export default React.memo(RaidPostFormRequirementsOptions);
