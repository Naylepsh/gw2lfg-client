import { Typography, Box } from "@material-ui/core";
import React from "react";
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
  const requirements = [{ name: "Legendary Insight" }];

  return (
    <Box
      my={3}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h6">Requirements</Typography>
      <Box display="flex" flexDirection="row" width="100%">
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

// Memoised RaidPostFormRequirementsOptions component, improves the performance
export default React.memo(RaidPostFormRequirementsOptions);
