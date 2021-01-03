import { Typography, Box } from "@material-ui/core";
import React from "react";
import RaidPostFormRequirementOption from "./RaidPostFormRequirementOption";

interface RaidPostFormRequirementsOptionsProps {
  requirementsId: string;
  itemsId: string;
  onChange: any;
}

export function RaidPostFormRequirementsOptions(
  props: RaidPostFormRequirementsOptionsProps
) {
  const { requirementsId, itemsId, onChange } = props;
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
          />
        ))}
      </Box>
    </Box>
  );
}

export default React.memo(RaidPostFormRequirementsOptions);
