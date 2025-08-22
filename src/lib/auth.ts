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
