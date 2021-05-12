import { Typography, Box } from "@material-ui/core";
import React from "react";
import { RaidBossDTO } from "../../services/gw2lfg-server/entities/RaidBossDTO";
import RaidBossOption from "./RaidBossOption";

interface RaidBossesOptionsProps {
  bosses: RaidBossDTO[];
  onChange: any;
  name: string;
  selectedBosses: string[];
}

/**
 * Renders a singular toggleable raid boss avatar-checkbox of an associated form
 */
export function RaidBossesOptions(props: RaidBossesOptionsProps) {
  const { onChange, name, selectedBosses, bosses } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      my={3}
    >
      <Typography variant="h6">Raid Bosses</Typography>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {bosses.map((boss) => (
          <RaidBossOption
            boss={boss}
            onChange={onChange}
            key={boss.id}
            name={name}
            checked={selectedBosses.includes(boss.id.toString())}
          />
        ))}
      </Box>
    </Box>
  );
}

// Memoised component, improves the performance
export default React.memo(RaidBossesOptions);
