import type {
  ScreenTimeResponse,
  ScreenTimeWeekResponse,
} from "@/types/screentime";
import { privateApi } from "./instances";

// 일간 스크린타임 조회
export const getScreenTimeDay = async (
  date?: string
): Promise<ScreenTimeResponse> => {
  const today = date || new Date().toISOString().split("T")[0];
  const { data } = await privateApi.get<ScreenTimeResponse>(
    `/api/screentime?period=day&date=${today}`
  );
  return data;
};

// 주간 스크린타임 조회
export const getScreenTimeWeek = async (): Promise<ScreenTimeWeekResponse> => {
  const { data } = await privateApi.get<ScreenTimeWeekResponse>(
    "/api/screentime?period=week"
  );
  return data;
};
