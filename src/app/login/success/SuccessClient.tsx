"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/api/user";
import { useUserStore } from "@/stores/userStore";

export default function SuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, setTokens } = useUserStore();

  const [message, setMessage] = useState("로그인 성공! 이동 중...");

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const userParam = searchParams.get("user");
    const characterIndexParam = searchParams.get("characterIndex");
    const isNewUserParam = searchParams.get("isNewUser");

    console.log("🔍 SuccessClient 파라미터:", {
      accessToken: accessToken?.substring(0, 20) + "...",
      refreshToken: refreshToken?.substring(0, 20) + "...",
      userParam,
      characterIndexParam,
      isNewUserParam,
    });

    if (!accessToken || !refreshToken) {
      setMessage("필수 토큰이 없어 로그인 처리를 완료할 수 없습니다.");
      return;
    }

    (async () => {
      try {
        // Zustand 스토어에 토큰 저장
        setTokens(accessToken, refreshToken);
        console.log("💾 토큰 저장 완료");

        if (userParam) {
          try {
            const userData = JSON.parse(userParam);
            setUser(userData);
            console.log("💾 기본 사용자 정보 저장 완료");
          } catch (_) {
            console.log("⚠️ 사용자 정보 파싱 실패");
          }
        }

        if (characterIndexParam) {
          localStorage.setItem("characterIndex", characterIndexParam);
        }

        // 새 유저면 온보딩, 아니면 메인으로
        const isNew = isNewUserParam === "true";
        console.log("🚀 사용자 타입:", isNew ? "새 사용자" : "기존 사용자");

        if (isNew) {
          console.log("🚀 온보딩으로 이동");
          router.replace("/onboarding");
        } else {
          console.log("🚀 기존 사용자: 프로필 조회 후 메인으로");
          try {
            console.log("📡 getUserProfile API 호출 시작");
            const profile = await getUserProfile();
            console.log("✅ 프로필 조회 성공:", profile);

            // 프로필 정보를 사용자 정보와 합쳐서 저장
            const fullUserInfo = {
              id: profile.id,
              email: userParam ? JSON.parse(userParam).email : "",
              name: userParam ? JSON.parse(userParam).name : "",
              nickname: profile.nickname,
              goal: profile.goal,
              screenTimeGoal: profile.screenTimeGoal,
            };

            setUser(fullUserInfo);
            console.log("💾 Zustand 스토어에 사용자 정보 저장 완료");
            router.replace("/main");
          } catch (error: any) {
            // Axios 인터셉터에서 Error(message + status)로 래핑됨
            const msg: string = error?.message ?? "";
            const is404 = msg.includes("(404)");
            console.error("❌ 프로필 조회 실패:", msg);
            if (is404) {
              console.log("🔁 프로필이 없어 온보딩으로 이동");
              router.replace("/onboarding");
            } else {
              console.log("➡️ 프로필 조회 실패이지만 메인으로 이동");
              router.replace("/main");
            }
          }
        }
      } catch (_e) {
        console.error("❌ 로그인 처리 중 오류:", _e);
        setMessage("로그인 정보 저장 중 오류가 발생했습니다.");
      }
    })();
  }, [router, searchParams, setUser, setTokens]);

  return (
    <div className='min-h-screen flex items-center justify-center px-6'>
      <div className='text-center'>
        <p className='text-gray-700 text-sm'>{message}</p>
      </div>
    </div>
  );
}
