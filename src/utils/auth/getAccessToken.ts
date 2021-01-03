import { accessToken } from "./authConstants";

export function getAccessToken() {
  const token = window.localStorage.getItem(accessToken);
  return token !== "null" ? token : null;
}
