/*
Creates headers used by gw2lfg-server
*/
export function createGw2lfgHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}
