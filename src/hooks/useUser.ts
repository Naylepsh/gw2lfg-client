import { useEffect, useState } from "react";
import { UserDTO } from "../services/gw2lfg-server/entities/UserDTO";
import { getAccessToken } from "../utils/auth/getAccessToken";
import { invalidateMeQuery, useMeQuery } from "./queries/users/useMeQuery";

export function useUser() {
  const [token] = useState(getAccessToken());

  useEffect(() => {
    async function getUser() {
      if (!token) {
        await invalidateMeQuery();
      }
    }

    getUser();
  }, [token]);

  const { isLoading, isError, data } = useMeQuery();

  return { user: data, isLoading, isError };
}
