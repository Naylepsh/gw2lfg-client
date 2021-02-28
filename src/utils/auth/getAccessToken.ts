import { accessToken } from "./authConstants";

/**
 * Gets access token form local storage.
 */
export function getAccessToken() {
  const token = window.localStorage.getItem(accessToken);
  /**
   * Only string values can be stored in localStorage,
   * thus null-value is actually 'null'-string
   */
  return token !== "null" ? token : null;
}
