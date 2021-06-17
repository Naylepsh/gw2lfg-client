import {
  ListItem,
  ListItemText,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { Box } from "@material-ui/core";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import React from "react";
import { NotificationDTO } from "../../services/gw2lfg-server/entities/NotificationDTO";

interface NotificationProps {
  notification: NotificationDTO;
  isSeen: boolean;
  markAsSeen: (notification: NotificationDTO) => any;
}

/**
 * Renders a single notification. To be used together with NotificationList component.
 */
export function Notification({
  notification,
  isSeen,
  markAsSeen,
}: NotificationProps) {
  const classes = useStyles();

  const text = parseText(notification.text);
  const date = new Date(notification.createdAt).toLocaleString();

  return (
    <ListItem className={isSeen ? classes.seenNotification : ""}>
      <Box mr={2}>
        {isSeen ? (
          <></>
        ) : (
          <NotInterestedIcon
            className={classes.markIcon}
            onClick={() => markAsSeen(notification)}
          />
        )}
      </Box>
      <ListItemText primary={text} secondary={date} />
    </ListItem>
  );
}

function parseText(text: string) {
  return <span>{text.split(" ").map(parseChunk)}</span>;
}

function parseChunk(chunk: string, index: number) {
  if (chunk.toLowerCase().startsWith("user#")) {
    const id = chunk.slice(5);
    return (
      <a key={index} href={`/users/${id}`}>
        User#{id}{" "}
      </a>
    );
  }

  if (chunk.toLowerCase().startsWith("post#")) {
    const id = chunk.slice(5);
    return (
      <a key={index} href={`/raid-posts/${id}`}>
        Raid Post#{id}{" "}
      </a>
    );
  }

  return chunk + " ";
}

const useStyles = makeStyles(() =>
  createStyles({
    seenNotification: {
      background: "#e8ebed",
    },
    markIcon: {
      cursor: "pointer",
    },
  })
);
