export type DayKey = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export type DayStatus = "success" | "partial" | "failed" | "future";

export interface TodayRecord {
  startTime: string;
  endTime: string;
  duration: number; // in minutes
}

export interface WeeklyReportResponse {
  weeklyRecords: Array<{
    day: DayKey;
    status: DayStatus;
    totalFocusedTime: number; // in minutes
    goal: number; // in minutes
  }>;
  currentStreak: number;
  longestStreak: number;
  totalFocusedTime: number; // in minutes
  weeklyGoal: number; // in minutes
  achievementRate: number; // percentage (0-100)
}
