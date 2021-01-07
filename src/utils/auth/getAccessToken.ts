import { accessToken } from "./authConstants";

export function getAccessToken() {
  const token = window.localStorage.getItem(accessToken);
  // only string values can be stored in localStorage,
  // thus null-value is actually 'null'-string
  return token !== "null" ? token : null;
}
