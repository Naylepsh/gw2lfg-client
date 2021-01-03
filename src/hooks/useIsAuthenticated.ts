import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "./queries/users/useMeQuery";

export function useIsAuthenticated() {
  const router = useRouter();
  const { data, isFetching, isLoading } = useMeQuery();

  useEffect(() => {
    if (!isFetching && !data) {
      const url = "/login";
      router.replace(url);
    }
  }, [data, isFetching, router]);

  const isAuthenticating = isFetching || isLoading

  return { isAuthenticating };
}
