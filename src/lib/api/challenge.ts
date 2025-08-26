import { privateApi } from "@/lib/api/instances";
import type {
  CreateChallengeRequest,
  CreateChallengeResponse,
  GetChallengeResponse,
  InviteUrlResponse,
  JoinChallengeResponse,
} from "@/lib/challenge";

export async function createChallenge(
  data: CreateChallengeRequest
): Promise<CreateChallengeResponse> {
  console.log("🔍 챌린지 생성 API 호출 시작:", {
    data: data,
  });

  try {
    const { data: responseData } =
      await privateApi.post<CreateChallengeResponse>("/api/challenge", data);

    console.log("✅ 챌린지 생성 API 성공:", {
      data: responseData,
      challengeId: responseData.data?.challenge_id,
      message: responseData.message,
    });

    return responseData;
  } catch (error) {
    console.error("❌ 챌린지 생성 API 호출 실패:", error);
    throw error;
  }
}

export async function getChallenge(): Promise<GetChallengeResponse> {
  try {
    const { data } =
      await privateApi.get<GetChallengeResponse>("/api/challenge");

    console.log("✅ 챌린지 API 응답 성공:", {
      data: data,
      hasData: !!data.data,
      dataKeys: data.data ? Object.keys(data.data) : null,
      challengesArray: data.data?.challenges,
      challengesLength: data.data?.challenges?.length || 0,
    });

    return data;
  } catch (error) {
    console.error("❌ 챌린지 조회 API 호출 실패:", error);
    throw error;
  }
}

export async function generateInviteUrl(
  challengeId: string
): Promise<InviteUrlResponse> {
  try {
    const { data } = await privateApi.post<InviteUrlResponse>(
      `/api/challenge/inviteUrl/${challengeId}`
    );

    console.log("✅ 초대 링크 생성 API 성공:", {
      data: data,
      url: data.data?.url,
    });

    return data;
  } catch (error) {
    console.error("❌ 초대 링크 생성 API 호출 실패:", error);
    throw error;
  }
}

export async function joinChallenge(
  inviteCode: string
): Promise<JoinChallengeResponse> {
  try {
    const { data } = await privateApi.post<JoinChallengeResponse>(
      "/api/challenge/join",
      {
        invite_code: inviteCode,
      }
    );

    return data;
  } catch (error) {
    console.error("❌ 챌린지 참여 API 호출 실패:", error);
    throw error;
  }
}
