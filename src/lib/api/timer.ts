import { privateApi } from "@/lib/api/instances";
import type { TimerRecordRequest, TimerRecordResponse } from "@/types/timer";

// 타이머 기록 저장
export async function saveTimerRecord(
  body: TimerRecordRequest
): Promise<TimerRecordResponse> {
  const { data } = await privateApi.post<TimerRecordResponse>(
    "/api/timer",
    body
  );
  return data;
}
