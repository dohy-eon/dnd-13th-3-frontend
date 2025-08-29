import type {
  ScreenTimeResponse,
  ScreenTimeWeekResponse,
} from "@/types/screentime";
import { privateApi } from "./instances";

// 스크린타임 생성/갱신 (하루 1회, 진입 시 호출)
export const createOrUpdateScreenTime = async (): Promise<{
  success: boolean;
  message: string;
  data?: ScreenTimeResponse["data"];
}> => {
  const { data } = await privateApi.post<{
    success: boolean;
    message: string;
    data?: ScreenTimeResponse["data"];
  }>("/api/screentime");
  return data;
};

// 일간 스크린타임 조회
export const getScreenTimeDay = async (
  date?: string
): Promise<ScreenTimeResponse> => {
  const today = date || new Date().toISOString().split("T")[0];
  try {
    const { data } = await privateApi.get<ScreenTimeResponse>(
      `/api/screentime?period=day&date=${today}`
    );

    // If screenTimes is empty or null, provide default values
    if (!data.data?.screenTimes?.[0]) {
      return {
        success: true,
        message: "No screen time data available",
        data: {
          screenTimes: [
            {
              date: today,
              totalMinutes: 0,
              appTimes: {
                instagram: 0,
                youtube: 0,
                kakaotalk: 0,
                chrome: 0,
              },
            },
          ],
        },
      };
    }

    return data;
  } catch (error) {
    console.error("Error fetching screen time:", error);
    // Return default data structure on error
    return {
      success: false,
      message: "Failed to fetch screen time data",
      data: {
        screenTimes: [
          {
            date: today,
            totalMinutes: 0,
            appTimes: {
              instagram: 0,
              youtube: 0,
              kakaotalk: 0,
              chrome: 0,
            },
          },
        ],
      },
    };
  }
};

// 주간 스크린타임 조회
export const getScreenTimeWeek = async (): Promise<ScreenTimeWeekResponse> => {
  console.log("[API] Fetching weekly screentime data...");
  try {
    const { data } = await privateApi.get<ScreenTimeWeekResponse>(
      "/api/screentime?period=week"
    );

    // Log summary info
    console.log("[API] Weekly screentime response:", {
      success: data.success,
      message: data.message,
      period: data.data?.period,
      dateRange: data.data
        ? `${data.data.startDate} ~ ${data.data.endDate}`
        : "N/A",
      totalMinutes: data.data?.totalMinutes,
      averageMinutes: data.data?.averageMinutes,
      dailyRecordsCount: data.data?.dailyRecords?.length || 0,
      weeklyAppTotals: data.data?.weeklyAppTotals,
    });

    // Log detailed daily records with status
    if (data.data?.dailyRecords?.length) {
      console.group("Daily Records Status:");
      data.data.dailyRecords.forEach((record) => {
        console.log(`[${record.date}] ${record.dayOfWeek}:`, {
          totalMinutes: record.totalMinutes,
          status: record.status,
          appTimes: record.appTimes,
        });
      });
      console.groupEnd();
    }

    return data;
  } catch (error: unknown) {
    const errorInfo = error as {
      response?: {
        status?: number;
        data?: unknown;
      };
      message?: string;
    };

    console.error("[API] Error fetching weekly screentime:", {
      error,
      message: errorInfo.message || "Unknown error",
      status: errorInfo.response?.status,
      data: errorInfo.response?.data,
    });
    throw error;
  }
};
