import { Box } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

interface LoadingProps {
  size?: "small" | "medium" | "large";
}

// Circular loading component
export default function Loading(props: LoadingProps) {
  const progressSize = { small: 40, medium: 60, large: 100 };
  const defaultSize = "medium";
  const size = progressSize[props.size ?? defaultSize];

  return (
    <Box
      width={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress color="secondary" size={size} />
    </Box>
  );
}