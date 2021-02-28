import { accessToken } from "./authConstants";

/**
 * Removes access token form local storage.
 */
export function discardAccessToken() {
  window.localStorage.removeItem(accessToken);
}
