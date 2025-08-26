export interface UserInfo {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
}

export interface GoogleLoginRequestBody {
  code: string;
  redirectUrl: string;
}

export interface ProfileRegistrationRequest {
  nickname: string;
  goal: {
    type: string;
    custom: string | null;
  };
  screenTimeGoal: {
    type: string;
    custom: string | null;
  };
}

export interface ProfileRegistrationResponse {
  message: string;
}

export interface UserProfileResponse {
  id: string;
  nickname: string;
  characterIndex?: number;
  goal: {
    type: string;
    custom: string | null;
  };
  screenTimeGoal: {
    type: string;
    custom: string | null;
  };
}
