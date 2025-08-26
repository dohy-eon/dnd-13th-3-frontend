"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getUserProfile } from "@/lib/api/user";

export default function SuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const userParam = searchParams.get("user");
  const characterIndexParam = searchParams.get("characterIndex");
  const isNewUserParam = searchParams.get("isNewUser");

  useEffect(() => {
    console.log("🔍 SuccessClient: URL 파라미터 확인", {
      accessToken: `${accessToken?.substring(0, 20)}...`,
      refreshToken: `${refreshToken?.substring(0, 20)}...`,
      userParam,
      characterIndexParam,
      isNewUserParam,
    });

    if (!accessToken || !refreshToken) {
      console.error("필수 토큰이 없어 로그인 처리를 완료할 수 없습니다.");
      return;
    }

    (async () => {
      try {
        // 쿠키에 토큰 저장 (SSR 사용)
        // biome-ignore lint/suspicious/noDocumentCookie: SSR을 위해 필요
        document.cookie = `accessToken=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
        // biome-ignore lint/suspicious/noDocumentCookie: SSR을 위해 필요
        document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;

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

            console.log("💾 쿠키에 토큰 저장 완료");
            router.replace("/main");
          } catch (error: unknown) {
            // Axios 인터셉터에서 Error(message + status)로 래핑됨
            const msg: string = error instanceof Error ? error.message : "";
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
      }
    })();
  }, [
    router,
    accessToken,
    refreshToken,
    userParam,
    characterIndexParam,
    isNewUserParam,
  ]);

  return (
    <div className='min-h-screen bg-primary flex items-center justify-center'>
      <div className='w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin' />
    </div>
  );
}
