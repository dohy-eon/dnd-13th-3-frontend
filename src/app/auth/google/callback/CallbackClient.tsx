"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { loginWithGoogle } from "@/lib/api/auth";

export default function CallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const accessTokenParam = searchParams.get("accessToken");
  const refreshTokenParam = searchParams.get("refreshToken");
  const userParam = searchParams.get("user");
  const [message, setMessage] = useState("구글 로그인 처리 중...");

  const redirectUrl = useMemo(
    () => `${window.location.origin}/auth/google/callback`,
    []
  );

  useEffect(() => {
    // 1) Backend-driven flow: tokens already in URL
    if (accessTokenParam && refreshTokenParam) {
      try {
        localStorage.setItem("accessToken", accessTokenParam);
        localStorage.setItem("refreshToken", refreshTokenParam);
        if (userParam) {
          try {
            localStorage.setItem("user", userParam);
          } catch (_) {
            // ignore if not valid JSON
          }
        }
        router.replace("/onboarding");
      } catch (_e) {
        setMessage("토큰 저장 중 오류가 발생했습니다.");
      }
      return;
    }

    // 2) Fallback: code exchange via API
    if (error) {
      setMessage(`구글 로그인 실패: ${error}`);
      return;
    }

    if (!code) return;

    (async () => {
      try {
        const res = await loginWithGoogle({ code, redirectUrl });
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("user", JSON.stringify(res.user));
        router.replace("/onboarding");
      } catch (e: unknown) {
        const errorMessage =
          e instanceof Error
            ? e.message
            : "로그인 처리 중 오류가 발생했습니다.";
        setMessage(errorMessage);
      }
    })();
  }, [
    accessTokenParam,
    refreshTokenParam,
    userParam,
    code,
    error,
    redirectUrl,
    router,
  ]);

  return (
    <div className='min-h-screen flex items-center justify-center px-6'>
      <div className='text-center'>
        <p className='text-gray-700 text-sm'>{message}</p>
      </div>
    </div>
  );
}
