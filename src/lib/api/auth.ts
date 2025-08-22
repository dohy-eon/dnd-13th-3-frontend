import { http } from "@/lib/api/http";
import type { GoogleLoginRequestBody, LoginResponse } from "@/lib/auth";

/**
 * Google OAuth login/signup
 * POST /api/auth/login/google
 * Body: { code, redirectUrl }
 */
export async function loginWithGoogle(
  body: GoogleLoginRequestBody
): Promise<LoginResponse> {
  const { data } = await http.post<LoginResponse>(
    "/api/auth/login/google",
    body
  );
  return data;
}
