export const TOTAL_STEPS = 3;

// 허용 문자: 한글 음절, 영문, 공백
export const ALLOWED_CHARS_REGEX = /[^A-Za-z가-힣\s]/g;

export function sanitizeNickname(value: string): string {
  return value.replace(ALLOWED_CHARS_REGEX, "").replace(/\s{2,}/g, " ");
}

// 스텝별 타이틀
export const ONBOARDING_TITLES: readonly string[] = [
  "우선, 당신을 뭐라고 부르면 좋을까요?",
  "어떤 목표를 세워볼까요?",
  "목표 시간을 알려주세요!",
] as const;

export function getOnboardingTitle(step: number): string {
  const index = Math.max(1, Math.min(step, ONBOARDING_TITLES.length)) - 1;
  return ONBOARDING_TITLES[index] ?? ONBOARDING_TITLES[0];
}
