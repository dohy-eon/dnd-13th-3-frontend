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
  characterIndex: number;
}

// 챌린지 히스토리용 참가자 정보
export interface HistoryParticipant {
  userId: number;
  nickname: string;
  characterIndex: number;
  current_time_minutes: number;
  instagram_minutes: number;
  youtube_minutes: number;
  kakaotalk_minutes: number;
  chrome_minutes: number;
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

// 현재 진행중인 챌린지용 참가자 정보
export interface CurrentChallengeParticipant {
  userId: number;
  nickname: string;
  current_time_minutes: number;
  achievement_rate: number;
  status: ChallengeStatus;
  characterIndex: number;
  instagram_minutes: number;
  youtube_minutes: number;
  kakaotalk_minutes: number;
  chrome_minutes: number;
}

// 현재 진행중인 챌린지
export interface CurrentChallenge {
  challengeId: number;
  type: ChallengeType;
  start_date: string;
  end_date: string;
  title: string;
  goal_time_minutes: number;
  invite_url: string;
  participants: CurrentChallengeParticipant[];
}

// 현재 진행중인 챌린지 조회 응답
export interface GetCurrentChallengeResponse {
  success: boolean;
  message: string;
  data: CurrentChallenge;
}

// 챌린지 히스토리 정보
export interface ChallengeHistory {
  challengeId: number;
  start_date: string;
  end_date: string;
  title: string;
  goal_time_minutes: number;
  participants: HistoryParticipant[];
}

// 챌린지 히스토리 응답
export interface GetChallengeHistoryResponse {
  success: boolean;
  message: string;
  data: {
    challenges: ChallengeHistory[];
  };
}

// 챌린지 생성 요청 데이터
export interface CreateChallengeRequest {
  start_date: string;
  end_date: string;
  goal_time_minutes: number;
  title: string;
}

// 챌린지 생성 응답
export interface CreateChallengeResponse {
  success: boolean;
  message: string;
  data: {
    challenge_id: number;
  };
}

// 챌린지 조회 응답
export interface GetChallengeResponse {
  success: boolean;
  message: string;
  data: {
    challenges: Challenge[];
  };
}

// 공유 챌린지 링크 생성 응답
export interface InviteUrlResponse {
  success: boolean;
  message: string;
  data: {
    url: string;
  };
}

// 챌린지 참여 요청
export interface JoinChallengeRequest {
  invite_code: string;
}

// 챌린지 참여 응답
export interface JoinChallengeResponse {
  success: boolean;
  message: string;
  data: {
    message: string;
    title: string;
    challenge_id: number;
    start_date: string;
    end_date: string;
    goal_time_minutes: number;
  };
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
