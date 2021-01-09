import { accessToken } from "./authConstants";

/*
Saves access token to local storage.
*/
export function saveAccessToken(token: string) {
  window.localStorage.setItem(accessToken, token);
}
