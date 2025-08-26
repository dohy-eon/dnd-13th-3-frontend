export interface TimerRecordRequest {
  category: string;
  duration_hours: number;
  duration_minutes: number;
  duration_seconds: number;
  started_at: string;
  ended_at: string;
}

export interface TimerRecordResponse {
  message: string;
}
