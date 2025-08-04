export const MISSION_OPTIONS = [
  "과제 끝내기",
  "업무 완료",
  "30분 집중하기",
  "일기 쓰기",
  "책 읽기",
  "청소",
  "생각 정리",
] as const;

export type MissionOption = (typeof MISSION_OPTIONS)[number];
