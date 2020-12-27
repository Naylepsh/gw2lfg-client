import { Typography, Box } from "@material-ui/core";
import React from "react";
import { RaidBossDTO } from "../../../services/gw2lfg-server/entities/RaidBossDTO";
import RaidPostFormRaidBossOption from "./RaidPostFormRaidBossOption";

interface RaidPostFormRaidBossesOptionsProps {
  bosses: RaidBossDTO[];
  onChange: any;
  name: string;
  selectedBosses: string[];
}

export function RaidPostFormRaidBossesOptions(
  props: RaidPostFormRaidBossesOptionsProps
) {
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
          <RaidPostFormRaidBossOption
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

export default React.memo(RaidPostFormRaidBossesOptions);
