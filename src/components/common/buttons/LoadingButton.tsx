import { Button, ButtonProps, CircularProgress } from "@material-ui/core";
import React from "react";

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}

/* 
Renders a button that displays circular loading animation if loading is set to true
*/
export default function LoadingButton(props: LoadingButtonProps) {
  const { isLoading, children, disabled, ...rest } = props;
  return (
    <Button {...rest} disabled={disabled || isLoading}>
      {isLoading && <CircularProgress size={24} />}
      {!isLoading && children}
    </Button>
  );
}
