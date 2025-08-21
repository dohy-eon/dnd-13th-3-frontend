export type OnboardingData = {
  nickname: string;
  goal: string;
  hours: number;
  minutes: number;
};

const KEY = "onboarding:data";

export function saveOnboardingData(data: OnboardingData) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch (error) {
    console.error("세션 저장 실패", error);
  }
}

export function loadOnboardingData(): OnboardingData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<OnboardingData>;
    if (
      typeof parsed.nickname === "string" &&
      typeof parsed.goal === "string" &&
      typeof parsed.hours === "number" &&
      typeof parsed.minutes === "number"
    ) {
      return parsed as OnboardingData;
    }
    return null;
  } catch {
    return null;
  }
}

export function clearOnboardingData() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(KEY);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      "Failed to remove onboarding data from sessionStorage:",
      error
    );
  }
}
