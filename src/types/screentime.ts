export interface ScreenTimeResponse {
  success: boolean;
  message: string;
  data: {
    screenTimes: Array<{
      date: string;
      totalMinutes: number;
      appTimes: {
        instagram: number;
        youtube: number;
        kakaotalk: number;
        chrome: number;
      };
    }>;
  };
}

export interface ScreenTimeWeekResponse {
  success: boolean;
  message: string;
  data: {
    period: string;
    startDate: string;
    endDate: string;
    totalMinutes: number;
    averageMinutes: number;
    weeklyAppTotals: {
      instagram: number;
      youtube: number;
      kakaotalk: number;
      chrome: number;
    };
    dailyRecords: Array<{
      date: string;
      totalMinutes: number;
      appTimes: {
        instagram: number;
        youtube: number;
        kakaotalk: number;
        chrome: number;
      };
    }>;
  };
}
