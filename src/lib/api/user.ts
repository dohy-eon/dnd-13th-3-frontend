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
  console.log("🔍 getUserProfile API 호출 시작");
  try {
    const { data } =
      await privateApi.get<UserProfileResponse>("/api/user/profile");
    console.log("✅ getUserProfile API 성공:", data);
    console.log("🔍 characterIndex 확인:", {
      value: data.characterIndex,
      type: typeof data.characterIndex,
      exists: "characterIndex" in data,
    });
    return data;
  } catch (error) {
    console.error("❌ getUserProfile API 실패:", error);
    throw error;
  }
}
