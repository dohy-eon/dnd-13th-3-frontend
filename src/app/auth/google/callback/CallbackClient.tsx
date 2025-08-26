"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { loginWithGoogle } from "@/lib/api/auth";

export default function CallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

        // 쿠키에 토큰 저장 (SSR 사용)
        // biome-ignore lint/suspicious/noDocumentCookie: SSR을 위해 필요
        document.cookie = `accessToken=${res.accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
        // biome-ignore lint/suspicious/noDocumentCookie: SSR을 위해 필요
        document.cookie = `refreshToken=${res.refreshToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;

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
  }, [code, error, redirectUrl, router]);

  return (
    <div className='min-h-screen flex items-center justify-center px-6'>
      <div className='text-center'>
        <p className='text-gray-700 text-sm'>{message}</p>
      </div>
    </div>
  );
}
