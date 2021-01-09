import { Avatar, Tooltip } from "@material-ui/core";
import React from "react";
import { items } from "./gw2items.json";

interface Gw2ItemAvatarProps {
  name: string;
}

/* 
Renders an item as a tooltip avatar
*/
function Gw2ItemAvatar(props: Gw2ItemAvatarProps) {
  const { name } = props;
  const item = items[name];

  return item ? (
    <Tooltip title={name}>
      <Avatar src={item.portrait} alt={name} variant="square"></Avatar>
    </Tooltip>
  ) : null;
}

// Memoised component, improves performance
export default React.memo(Gw2ItemAvatar);
