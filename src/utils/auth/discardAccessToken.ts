import { accessToken } from "./authConstants";

export function discardAccessToken() {
  window.localStorage.removeItem(accessToken);
}
