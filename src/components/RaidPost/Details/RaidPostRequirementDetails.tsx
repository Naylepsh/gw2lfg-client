import { Typography, Box } from "@material-ui/core";
import React from "react";
import { ItemRequirementDTO } from "../../../services/gw2lfg-server/entities/ItemRequirementDTO";
import Gw2ItemAvatar from "../../Gw2Item/Gw2ItemAvatar";

interface RaidPostRequirementsDetailsProps {
  requirements: {
    items: ItemRequirementDTO[];
  };
}

/* 
Renders item requirements in a list of (<ItemAvatar> x <quantity>) components
*/
export function RaidPostRequirementsDetails(
  props: RaidPostRequirementsDetailsProps
) {
  const { requirements } = props;
  const { items } = requirements;

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
        {items.map((item) => (
          <Box
            key={item.name}
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            m={3}
          >
            <Gw2ItemAvatar name={item.name} />
            <Box fontSize={24} ml={1}>
              x{item.quantity}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// Memoised RaidPostRequirementsDetails component, improves the performance
export default React.memo(RaidPostRequirementsDetails);
