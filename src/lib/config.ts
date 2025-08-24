const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://minu.site";

const OAUTH_START_URL =
  process.env.NEXT_PUBLIC_OAUTH_START_URL ||
  "https://minu.site/oauth2/authorization/google";

export { API_BASE_URL, OAUTH_START_URL };
