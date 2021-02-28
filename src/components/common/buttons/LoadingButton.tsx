import { Button, ButtonProps, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";

interface LoadingButtonProps extends ButtonProps {}

/**
 * Renders a button that displays circular loading animation if loading is set to true
 */
export default function LoadingButton(props: LoadingButtonProps) {
  const { children, disabled, onClick, ...rest } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    setIsLoading(true);
    await onClick(e);
    setIsLoading(false);
  };

  return (
    <Button {...rest} disabled={disabled || isLoading} onClick={handleClick}>
      {isLoading && <CircularProgress size={24} />}
      {!isLoading && children}
    </Button>
  );
}
