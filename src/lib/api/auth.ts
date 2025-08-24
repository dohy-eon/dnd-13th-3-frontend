import { publicApi } from "@/lib/api/instances";
import type { GoogleLoginRequestBody, LoginResponse } from "@/types/auth";

/**
 * Google OAuth login/signup
 * POST /api/auth/login/google
 * Body: { code, redirectUrl }
 */
export async function loginWithGoogle(
  body: GoogleLoginRequestBody
): Promise<LoginResponse> {
  const { data } = await publicApi.post<LoginResponse>(
    "/api/auth/login/google",
    body
  );
  return data;
}
