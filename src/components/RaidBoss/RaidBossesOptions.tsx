import {
  FormControl,
  FormLabel,
  FormGroup,
  makeStyles,
  createStyles,
  FormHelperText,
} from "@material-ui/core";
import React from "react";
import { RaidBossDTO } from "../../services/gw2lfg-server/entities/RaidBossDTO";
import RaidBossOption from "./RaidBossOption";

interface RaidBossesOptionsProps {
  bosses: RaidBossDTO[];
  onChange: any;
  name: string;
  selectedBosses: string[];
  errorMessage?: string;
  required?: boolean;
}

/**
 * Renders a singular toggleable raid boss avatar-checkbox of an associated form
 */
export function RaidBossesOptions(props: RaidBossesOptionsProps) {
  const { onChange, name, selectedBosses, bosses, errorMessage } = props;
  const required = props.required ?? false;
  const classes = useStyles();

  return (
    <FormControl
      required={required}
      error={!!errorMessage}
      className={classes.formControl}
    >
      <FormLabel component="legend">Raid Bosses</FormLabel>
      <FormHelperText>{errorMessage}</FormHelperText>
      <FormGroup className={classes.formGroup}>
        {bosses.map((boss) => (
          <RaidBossOption
            key={boss.id}
            boss={boss}
            onChange={onChange}
            name={name}
            checked={selectedBosses.includes(boss.id.toString())}
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
