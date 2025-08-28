"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "@/lib/api/auth";

interface LogoutModalProps {
  onClose: () => void;
}

export default function LogoutModal({ onClose }: LogoutModalProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      setShowSuccessMessage(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error("로그아웃 실패:", error);
      router.push("/login");
    }
  };

  if (showSuccessMessage) {
    return (
      <div className='fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[99999]'>
        <div className='w-80 py-3 bg-neutral-900/90 rounded-lg inline-flex justify-center items-center gap-1.5'>
          <Image
            src='/images/logos/CopyLink.svg'
            alt='CopyLink'
            width={24}
            height={24}
            priority
          />
          <div className='text-white text-sm font-medium'>
            로그아웃 되었습니다!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='fixed inset-0 bg-dim-background flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-2xl p-6 min-w-screen-mobile w-[327px] mx-auto'>
        <h2 className='text-xl font-semibold text-gray-900 mb-[24px]'>
          로그아웃 하시겠습니까?
        </h2>
        <div className='flex gap-3'>
          <button
            type='button'
            onClick={onClose}
            className='flex-1 btn-medium bg-gray-200 text-gray-500'
            disabled={isLoggingOut}
          >
            취소
          </button>
          <button
            type='button'
            onClick={handleLogout}
            className='flex-1 btn-medium btn-primary'
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "처리중..." : "로그아웃"}
          </button>
        </div>
      </div>
    </div>
  );
}
