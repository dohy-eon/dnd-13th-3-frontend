// 챌린지 타입
export type ChallengeType = "personal" | "share";

// 챌린지 상태
export type ChallengeStatus = "진행 중" | "달성" | "실패";

// 참가자 정보
export interface Participant {
  userId: number;
  nickname: string;
  current_time_minutes: number;
  achievement_rate: number;
  status: ChallengeStatus;
}

// 챌린지 정보
export interface Challenge {
  challengeId: number;
  type: ChallengeType;
  start_date: string;
  end_date: string;
  title: string;
  goal_time_minutes: number;
  participants: Participant[];
}

// 챌린지 생성 요청 데이터
export interface CreateChallengeRequest {
  start_date: string;
  end_date: string;
  goal_time_minutes: number;
  type: ChallengeType;
  title: string;
}

// 챌린지 생성 응답
export interface CreateChallengeResponse {
  challenge_id: number;
  message: string;
}

// 챌린지 조회 응답
export interface GetChallengeResponse {
  success: boolean;
  message: string;
  data: Challenge;
}

// 공유 챌린지 링크 생성 응답
export interface InviteUrlResponse {
  url: string;
}

// 챌린지 폼 데이터
export interface ChallengeFormData {
  title: string;
  goalTimeHours: number;
  startDate: string;
  endDate: string;
}

// 챌린지 페이지 상태
export type ChallengePageState = "empty" | "creating" | "success";
