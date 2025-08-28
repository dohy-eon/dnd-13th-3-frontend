import { privateApi, publicApi } from "@/lib/api/instances";
import type { GoogleLoginRequestBody, LoginResponse } from "@/types/auth";

export async function loginWithGoogle(
  body: GoogleLoginRequestBody
): Promise<LoginResponse> {
  const { data } = await publicApi.post<LoginResponse>(
    "/api/auth/login/google",
    body
  );
  return data;
}

export async function logout(): Promise<{ message: string }> {
  const { data } = await privateApi.post<{ message: string }>(
    "/api/auth/logout"
  );
  return data;
}
