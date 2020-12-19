const accessToken = "ACCESS_TOKEN";

export function getAccessToken() {
  const token = window.localStorage.getItem(accessToken);
  return token !== "null" ? token : null;
}

export function saveAccessToken(token: string) {
  window.localStorage.setItem(accessToken, token);
}

export function discardAccessToken() {
  window.localStorage.removeItem(accessToken);
}
