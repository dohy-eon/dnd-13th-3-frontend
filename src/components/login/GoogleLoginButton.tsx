"use client";

import { useState, useEffect } from "react";
import { Browser } from "@capacitor/browser";
import { Capacitor } from "@capacitor/core";
import { loginWithGoogle } from "@/lib/api/auth";
import { OAUTH_START_URL } from "@/lib/config";
import clsx from "clsx";

interface GoogleLoginButtonProps {
  onClick?: () => void;
}

export default function GoogleLoginButton({ onClick }: GoogleLoginButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleNativeLogin = async () => {
    // 디버깅을 위한 플랫폼 정보 출력
    console.log("Capacitor.isNativePlatform():", Capacitor.isNativePlatform());
    console.log("Capacitor.getPlatform():", Capacitor.getPlatform());
    console.log("User Agent:", navigator.userAgent);
    
    if (!Capacitor.isNativePlatform()) {
      console.log("웹 환경에서 실행 중 - 기존 방식 사용");
      // 웹에서는 기존 방식 사용
      window.location.replace(OAUTH_START_URL);
      return;
    }
    
    console.log("네이티브 환경에서 실행 중 - Capacitor Browser 사용");

    setIsLoading(true);
    onClick?.();

    try {
      // 네이티브 앱임을 백엔드에 알리기 위한 파라미터 추가
      const oauthUrl = `${OAUTH_START_URL}?is_native_app=true&platform=${Capacitor.getPlatform()}`;
      console.log("Opening OAuth URL:", oauthUrl);

      // 네이티브 앱에서 OAuth 플로우 시작
      await Browser.open({
        url: oauthUrl,
        windowName: "_self",
        presentationStyle: "popover",
      });

      console.log("Browser opened successfully");

      // OAuth 콜백은 웹 페이지에서 처리되고, 
      // 앱으로 돌아오는 것은 URL 스킴을 통해 처리됨

    } catch (error) {
      console.error("네이티브 로그인 오류:", error);
      alert(error instanceof Error ? error.message : "로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={clsx(
        "absolute bottom-6 left-0 right-0 px-6 z-50",
        "transition-opacity duration-700 ease-out",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className='max-w-md mx-auto'>
        <button
          type='button'
          className={clsx(
            "w-full flex items-center justify-center gap-3 bg-white py-3 px-4 rounded-xl",
            "hover:shadow-md transition-all duration-200",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
          onClick={handleNativeLogin}
          disabled={isLoading}
        >
          <div className='flex-shrink-0 w-5 h-5'>
            <svg
              viewBox='0 0 48 48'
              xmlns='http://www.w3.org/2000/svg'
              className='w-full h-full'
            >
              <title>Google Logo</title>
              <path
                fill='#EA4335'
                d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'
              />
              <path
                fill='#4285F4'
                d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'
              />
              <path
                fill='#FBBC05'
                d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'
              />
              <path
                fill='#34A853'
                d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'
              />
              <path fill='none' d='M0 0h48v48H0z' />
            </svg>
          </div>
          <span className='text-sm font-semibold'>
            {isLoading ? "로그인 중..." : "Google로 로그인"}
          </span>
        </button>
      </div>
    </div>
  );
}
