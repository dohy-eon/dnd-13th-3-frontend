const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_BASE_URL) {
  console.error("Missing NEXT_PUBLIC_API_URL in config");
  throw new Error("API base URL must be configured via NEXT_PUBLIC_API_URL");
}

const OAUTH_START_URL = process.env.NEXT_PUBLIC_OAUTH_START_URL;
if (!OAUTH_START_URL) {
  console.error("Missing NEXT_PUBLIC_OAUTH_START_URL in config");
  throw new Error(
    "OAuth start URL must be configured via NEXT_PUBLIC_OAUTH_START_URL"
  );
}

export { API_BASE_URL, OAUTH_START_URL };
