import { Checkbox, Badge } from "@material-ui/core";
import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import { RaidBossDTO } from "../../services/gw2lfg-server/entities/RaidBossDTO";
import RaidBossAvatar from "./RaidBossAvatar";

interface RaidBossOptionProps {
  boss: RaidBossDTO;
  onChange: any;
  name: string;
  checked: boolean;
}

/**
 * Renders a singular toggleable raid boss avatar-checkbox of an associated form
 */
export function RaidBossOption(props: RaidBossOptionProps) {
  const { onChange, boss, name, checked } = props;

  /**
   * Checkbox for obviously toggleable option
   * Avatar for an icon
   * Badge for displaying a checkmark on the icon if checkbox is checked
   */
  return (
    <Checkbox
      checked={checked}
      checkedIcon={
        <Badge
          badgeContent={<CheckIcon color="secondary" fontSize="large" />}
          overlap="circle"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <RaidBossAvatar {...boss} />
        </Badge>
      }
      icon={<RaidBossAvatar {...boss} />}
      onChange={onChange}
      name={name}
      value={boss.id}
    />
  );
}

// Memoised component, improves the performance
export default React.memo(RaidBossOption);
