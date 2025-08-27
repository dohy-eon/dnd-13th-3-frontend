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
    // Return a plain JSON-serializable clone to avoid RSC serialization issues
    const plain = JSON.parse(JSON.stringify(data)) as UserProfileResponse;
    return plain;
  } catch (error) {
    console.error("❌ getUserProfile API 실패:", error);
    throw error;
  }
}

// 프로필 수정 (닉네임 제외 목표/시간/캐릭터 포함 가능)
export type UpdateProfileRequest = {
  goal?: {
    type: string; // preset label string or "CUSTOM"
    custom?: string | null; // only when type === "CUSTOM"
  };
  screenTimeGoal?: {
    type: string; // "120" | "240" | "360" | "480" | "CUSTOM"
    custom?: string | null; // only when type === "CUSTOM" (minutes as string)
  };
  nickname?: string;
  characterIndex?: number;
};

export async function updateUserProfile(
  body: UpdateProfileRequest
): Promise<{ message: string }> {
  console.log(
    "🔄 updateUserProfile 요청 데이터:",
    JSON.stringify(body, null, 2)
  );
  try {
    const { data } = await privateApi.patch<{ message: string }>(
      "/api/user/profile",
      body
    );
    console.log("✅ updateUserProfile 성공:", data);
    return data;
  } catch (error) {
    console.error("❌ updateUserProfile 실패:", error);
    throw error;
  }
}
