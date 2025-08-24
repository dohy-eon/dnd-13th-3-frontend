import axios from "axios";
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
privateApi.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    // Zustand 스토어에서 토큰 가져오기
    const { accessToken } =
      require("@/stores/userStore").useUserStore.getState();
    if (accessToken) {
      config.headers = config.headers ?? {};
      (config.headers as Record<string, string>).Authorization =
        `Bearer ${accessToken}`;
    }
  }
  return config;
});

// 응답 인터셉터 추가
const responseInterceptor = (res: any) => res;
const errorInterceptor = (error: any) => {
  const status = error?.response?.status;
  const message = error?.response?.data?.message ?? error.message;
  return Promise.reject(new Error(`${message}${status ? ` (${status})` : ""}`));
};

publicApi.interceptors.response.use(responseInterceptor, errorInterceptor);
privateApi.interceptors.response.use(responseInterceptor, errorInterceptor);
