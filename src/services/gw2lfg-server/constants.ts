const DEFAULT_URL = "http://localhost:3001";

// Normal env variables can only be access on server side
// To access a variable in a browser one has to prefix it with NEXT_PUBLIC both in .env and in code
export const gw2lfgUrl =
  process.env.NEXT_PUBLIC_GW2LFG_SERVER_URL || // env var exported to browser
  process.env.GW2LFG_SERVER_URL || // server side env var
  DEFAULT_URL;
