import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  makeStyles,
  createStyles,
} from "@material-ui/core";
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
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <FormLabel component="legend">Raid Bosses</FormLabel>
      <FormGroup className={classes.formGroup}>
        {bosses.map((boss) => (
          <FormControlLabel
            key={boss.id}
            control={
              <RaidBossOption
                boss={boss}
                onChange={onChange}
                name={name}
                checked={selectedBosses.includes(boss.id.toString())}
              />
            }
            label=""
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

// Memoised component, improves the performance
export default React.memo(RaidBossesOptions);

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
    },
  })
);
