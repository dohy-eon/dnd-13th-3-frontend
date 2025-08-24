"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { loginWithGoogle } from "@/lib/api/auth";
import { useUserStore } from "@/stores/userStore";

export default function CallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, setTokens } = useUserStore();

  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const [message, setMessage] = useState("구글 로그인 처리 중...");

  const redirectUrl = useMemo(
    () => `${window.location.origin}/auth/google/callback`,
    []
  );

  useEffect(() => {
    // code exchange via API
    if (error) {
      setMessage(`구글 로그인 실패: ${error}`);
      return;
    }

    if (!code) return;

    (async () => {
      try {
        const res = await loginWithGoogle({ code, redirectUrl });

        // Zustand 스토어에 사용자 정보와 토큰 저장
        setTokens(res.accessToken, res.refreshToken);
        setUser(res.user);

        // 기본적으로 온보딩으로 이동
        router.replace("/onboarding");
      } catch (e: unknown) {
        const errorMessage =
          e instanceof Error
            ? e.message
            : "로그인 처리 중 오류가 발생했습니다.";
        setMessage(errorMessage);
      }
    })();
  }, [code, error, redirectUrl, router, setUser, setTokens]);

  return (
    <div className='min-h-screen flex items-center justify-center px-6'>
      <div className='text-center'>
        <p className='text-gray-700 text-sm'>{message}</p>
      </div>
    </div>
  );
}
