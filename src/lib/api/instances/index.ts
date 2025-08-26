import axios, { type AxiosResponse } from "axios";
import { API_BASE_URL } from "@/lib/config";

// 토큰이 필요없는 API용 인스턴스 (로그인 등)
export const publicApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 토큰이 필요한 API용 인스턴스
export const privateApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// privateApi에 토큰 인터셉터 추가
privateApi.interceptors.request.use(async (config) => {
  let accessToken: string | undefined;

  if (typeof window !== "undefined") {
    // 클라이언트: 쿠키에서 토큰 가져오기
    try {
      const cookies = document.cookie.split(";");
      const accessTokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("accessToken=")
      );
      if (accessTokenCookie) {
        accessToken = accessTokenCookie.split("=")[1];
      }
    } catch (error) {
      console.warn("클라이언트 쿠키에서 토큰을 가져올 수 없습니다:", error);
    }
  } else {
    // 서버: next/headers에서 토큰 가져오기
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      accessToken = cookieStore.get("accessToken")?.value;
    } catch (error) {
      console.warn("서버 쿠키에서 토큰을 가져올 수 없습니다:", error);
    }
  }

  if (accessToken) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>).Authorization =
      `Bearer ${accessToken}`;
  }

  return config;
});

// 응답 인터셉터 추가
const responseInterceptor = (res: AxiosResponse) => res;
const errorInterceptor = (error: unknown) => {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as {
      response?: { status?: number; data?: { message?: string } };
    };
    const status = axiosError.response?.status;
    const message =
      axiosError.response?.data?.message ??
      (error instanceof Error ? error.message : "Unknown error");
    return Promise.reject(
      new Error(`${message}${status ? ` (${status})` : ""}`)
    );
  }
  const message = error instanceof Error ? error.message : "Unknown error";
  return Promise.reject(new Error(message));
};

publicApi.interceptors.response.use(responseInterceptor, errorInterceptor);
privateApi.interceptors.response.use(responseInterceptor, errorInterceptor);
