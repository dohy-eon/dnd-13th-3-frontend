"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [message, setMessage] = useState("로그인 성공! 이동 중...");

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const userParam = searchParams.get("user");
    const characterIndexParam = searchParams.get("characterIndex");
    const isNewUserParam = searchParams.get("isNewUser");

    if (!accessToken || !refreshToken) {
      setMessage("필수 토큰이 없어 로그인 처리를 완료할 수 없습니다.");
      return;
    }

    try {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      if (userParam) {
        try {
          localStorage.setItem("user", userParam);
        } catch (_) {}
      }
      if (characterIndexParam) {
        localStorage.setItem("characterIndex", characterIndexParam);
      }
      if (isNewUserParam) {
        localStorage.setItem("isNewUser", isNewUserParam);
      }

      // 새 유저면 온보딩, 아니면 메인으로
      const isNew = isNewUserParam === "true";
      router.replace(isNew ? "/onboarding" : "/main");
    } catch (_e) {
      setMessage("로그인 정보 저장 중 오류가 발생했습니다.");
    }
  }, [router, searchParams]);

  return (
    <div className='min-h-screen flex items-center justify-center px-6'>
      <div className='text-center'>
        <p className='text-gray-700 text-sm'>{message}</p>
      </div>
    </div>
  );
}
