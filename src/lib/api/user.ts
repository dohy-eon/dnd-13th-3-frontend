import { privateApi } from "@/lib/api/instances";
import type {
  ProfileRegistrationRequest,
  ProfileRegistrationResponse,
  UserProfileResponse,
} from "@/types/auth";

// 사용자 프로필 등록 (온보딩)
export async function registerUserProfile(
  body: ProfileRegistrationRequest
): Promise<ProfileRegistrationResponse> {
  const { data } = await privateApi.post<ProfileRegistrationResponse>(
    "/api/user/profile",
    body
  );
  return data;
}

//사용자 프로필 조회
export async function getUserProfile(): Promise<UserProfileResponse> {
  const { data } =
    await privateApi.get<UserProfileResponse>("/api/user/profile");
  return data;
}
