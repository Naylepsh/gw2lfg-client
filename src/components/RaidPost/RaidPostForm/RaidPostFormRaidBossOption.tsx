import { Checkbox, Badge } from "@material-ui/core";
import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import { RaidBossDTO } from "../../../services/gw2lfg-server/entities/RaidBossDTO";
import RaidBossAvatar from "../../RaidBoss/RaidBossAvatar";

interface RaidPostFormRaidBossOptionProps {
  boss: RaidBossDTO;
  onChange: any;
  name: string;
  checked: boolean;
}

export function RaidPostFormRaidBossOption(
  props: RaidPostFormRaidBossOptionProps
) {
  const { onChange, boss, name, checked } = props;

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

export default React.memo(RaidPostFormRaidBossOption);
