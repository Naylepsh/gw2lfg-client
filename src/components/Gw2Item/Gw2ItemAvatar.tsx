import { Avatar, Box, Tooltip } from "@material-ui/core";
import React from "react";
import { items } from "./gw2items.json";

interface Gw2ItemAvatarProps {
  name: string;
}

function Gw2ItemAvatar(props: Gw2ItemAvatarProps) {
  const { name } = props;
  const item = items[name];

  return item ? (
    <Box m={1}>
      <Tooltip title={name}>
        <Avatar src={item.portrait} alt={name} variant="square"></Avatar>
      </Tooltip>
    </Box>
  ) : null;
}

export default React.memo(Gw2ItemAvatar);
