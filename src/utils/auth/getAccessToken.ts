import { accessToken } from "./authConstants";

/**
 * Gets access token form local storage.
 */
export function getAccessToken(): string | null {
  const storage = typeof window !== "undefined" ? window.localStorage : null;
  if (!storage) {
    return null;
  }

  const token = storage.getItem(accessToken);
  /**
   * Only string values can be stored in localStorage,
   * thus null-value is actually 'null' string
   */
  return token !== "null" ? token : null;
}
