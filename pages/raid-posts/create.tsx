import React from "react";
import RaidPostForm from "../../src/components/RaidPost/Form/RaidPostForm";
import { useIsAuthenticated } from "../../src/hooks/useIsAuthenticated";
import Loading from "../../src/components/Loading/Loading";

export default function CreateNewPost() {
  const { isAuthenticating } = useIsAuthenticated();

  return isAuthenticating ? <Loading size="large" /> : <RaidPostForm />;
}
