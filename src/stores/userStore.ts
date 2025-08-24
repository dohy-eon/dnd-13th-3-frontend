import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserInfo } from "@/types/auth";

interface UserState {
  // 사용자 기본 정보 + 프로필 정보
  user:
    | (UserInfo & {
        nickname?: string;
        goal?: {
          type: string;
          custom?: string | null;
        };
        screenTimeGoal?: {
          type: string;
          custom?: string | null;
        };
      })
    | null;
  // 인증 토큰
  accessToken: string | null;
  refreshToken: string | null;
  // 온보딩 완료 여부
  isOnboardingCompleted: boolean;
  // 온보딩 정보
  onboardingData: {
    nickname: string;
    goal: {
      type: string;
      custom: string | null;
    };
    screenTimeGoal: {
      type: string;
      custom: string | null;
    };
  } | null;

  // 액션들
  setUser: (
    user: UserInfo & {
      nickname?: string;
      goal?: {
        type: string;
        custom?: string | null;
      };
      screenTimeGoal?: {
        type: string;
        custom?: string | null;
      };
    }
  ) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setOnboardingData: (data: {
    nickname: string;
    goal: { type: string; custom: string | null };
    screenTimeGoal: { type: string; custom: string | null };
  }) => void;
  completeOnboarding: () => void;
  logout: () => void;
  clearOnboardingData: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      user: null,
      accessToken: null,
      refreshToken: null,
      isOnboardingCompleted: false,
      onboardingData: null,

      // 액션들
      setUser: (user) => {
        console.log("🔄 Zustand: setUser 호출됨", user);
        set({ user });
      },

      setTokens: (accessToken, refreshToken) => {
        console.log("🔄 Zustand: setTokens 호출됨", {
          accessToken: accessToken?.substring(0, 20) + "...",
          refreshToken: refreshToken?.substring(0, 20) + "...",
        });
        set({ accessToken, refreshToken });
      },

      setOnboardingData: (data) => {
        console.log("🔄 Zustand: setOnboardingData 호출됨", data);
        set({ onboardingData: data });
      },

      completeOnboarding: () => {
        console.log("🔄 Zustand: completeOnboarding 호출됨");
        set({ isOnboardingCompleted: true });
      },

      logout: () => {
        console.log("🔄 Zustand: logout 호출됨");
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isOnboardingCompleted: false,
          onboardingData: null,
        });
      },

      clearOnboardingData: () => {
        console.log("🔄 Zustand: clearOnboardingData 호출됨");
        set({
          onboardingData: null,
          isOnboardingCompleted: false,
        });
      },
    }),
    {
      name: "user-storage", // localStorage 키 이름
      partialize: (state) => ({
        // 민감한 정보는 제외하고 필요한 정보만 저장
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isOnboardingCompleted: state.isOnboardingCompleted,
        onboardingData: state.onboardingData,
      }),
    }
  )
);
