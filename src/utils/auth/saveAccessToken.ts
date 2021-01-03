import { accessToken } from "./authConstants";

export function saveAccessToken(token: string) {
  window.localStorage.setItem(accessToken, token);
}
