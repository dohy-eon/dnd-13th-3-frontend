"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Capacitor } from "@capacitor/core";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // 네이티브 앱에서만 URL 스킴 처리
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    const handleUrlScheme = (url: string) => {
      console.log("URL 스킴 감지:", url);
      
      if (url.startsWith("minu://auth/success")) {
        console.log("로그인 성공 - 온보딩으로 이동");
        router.push("/onboarding");
      } else if (url.startsWith("minu://auth/error")) {
        console.log("로그인 에러 감지");
        const urlObj = new URL(url);
        const error = urlObj.searchParams.get("error");
        alert(`로그인 실패: ${error || "알 수 없는 오류"}`);
        router.push("/login");
      }
    };

    // 앱이 포그라운드로 돌아올 때 URL 스킴 확인
    const handleAppStateChange = () => {
      // 현재 URL이 앱 스킴인지 확인
      if (window.location.href.startsWith("minu://")) {
        handleUrlScheme(window.location.href);
      }
    };

    // 앱 상태 변화 감지
    document.addEventListener("visibilitychange", handleAppStateChange);
    window.addEventListener("focus", handleAppStateChange);

    // 초기 로드 시에도 확인
    handleAppStateChange();

    return () => {
      document.removeEventListener("visibilitychange", handleAppStateChange);
      window.removeEventListener("focus", handleAppStateChange);
    };
  }, [router]);

  return <>{children}</>;
}
