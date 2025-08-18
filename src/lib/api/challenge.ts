import type {
  Challenge,
  CreateChallengeRequest,
  CreateChallengeResponse,
  GetChallengeResponse,
  InviteUrlResponse,
} from "@/lib/challenge";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function createChallenge(
  data: CreateChallengeRequest,
  accessToken: string
): Promise<CreateChallengeResponse> {
  const response = await fetch(`${API_BASE_URL}/api/challenge`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("챌린지 생성에 실패했습니다.");
  }

  return response.json();
}

export async function getChallenge(
  type: "personal" | "share",
  startDate?: string,
  endDate?: string,
  accessToken?: string
): Promise<GetChallengeResponse> {
  const params = new URLSearchParams({ type });
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/challenge?${params}`, {
    method: "GET",
    headers,
    cache: "no-store",
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error("챌린지 조회에 실패했습니다.");
  }

  return response.json();
}

export async function generateInviteUrl(
  accessToken: string
): Promise<InviteUrlResponse> {
  const response = await fetch(`${API_BASE_URL}/api/challenge/inviteUrl`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("초대 링크 생성에 실패했습니다.");
  }

  return response.json();
}

export async function checkOngoingChallenge(
  type: "personal" | "share" = "personal",
  accessToken?: string
): Promise<{ hasChallenge: boolean; challengeData: Challenge | null }> {
  try {
    const response = await getChallenge(
      type,
      undefined,
      undefined,
      accessToken
    );

    if (response.success && response.data) {
      return {
        hasChallenge: true,
        challengeData: response.data,
      };
    } else {
      return {
        hasChallenge: false,
        challengeData: null,
      };
    }
  } catch (error) {
    console.error("챌린지 상태 확인 실패:", error);
    return {
      hasChallenge: false,
      challengeData: null,
    };
  }
}

export function mockChallengeAPI() {
  return {
    noOngoingChallenge: {
      success: false,
      message: "진행 중인 챌린지가 없습니다.",
      data: null,
    },
    hasOngoingChallenge: {
      success: true,
      message: "챌린지 조회가 성공했습니다.",
      data: {
        challengeId: 1,
        type: "personal",
        start_date: "2025-01-20",
        end_date: "2025-01-27",
        title: "유튜브 줄이기 챌린지",
        goal_time_minutes: 300,
        participants: [
          {
            userId: 1,
            nickname: "미누",
            current_time_minutes: 80,
            achievement_rate: 73.33,
            status: "진행 중",
          },
        ],
      },
    },
  };
}
