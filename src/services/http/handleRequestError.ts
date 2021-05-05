import { discardAccessToken } from "../../utils/auth/discardAccessToken";

export function handleRequestError(requestError: { status: number }) {
  if (requestError.status === 401) {
    discardAccessToken();
  }
}
