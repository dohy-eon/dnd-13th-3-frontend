"use client";

import Image from "next/image";
import { useState } from "react";

interface InviteFriendModalProps {
  onClose: () => void;
  inviteUrl: string;
}

export default function InviteFriendModal({
  onClose,
  inviteUrl,
}: InviteFriendModalProps) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCopyLink = async () => {
    if (!inviteUrl) {
      alert("초대 링크가 없습니다.");
      return;
    }

    try {
      await navigator.clipboard.writeText(inviteUrl);
      setIsLinkCopied(true);
      setTimeout(() => {
        setIsLinkCopied(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("❌ 링크 복사 실패:", error);
      alert("링크 복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (isLinkCopied) {
    return (
      <div className='fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[99999]'>
        <div className='w-80 py-3 bg-neutral-900/90 rounded-lg inline-flex justify-center items-center gap-1.5'>
          <Image
            src='/images/logos/CopyLink.svg'
            alt='Copy Link'
            width={24}
            height={24}
            priority
          />
          <div className='text-white text-sm font-medium'>
            링크를 복사했습니다!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className='fixed inset-0 bg-dim-background flex items-center justify-center z-[99999] p-4'
      onClick={handleBackdropClick}
    >
      <div className='bg-white rounded-2xl p-6 min-w-screen-mobile w-[327px] mx-auto'>
        <div className='flex flex-col justify-start items-center gap-5'>
          <div className='flex flex-col justify-start items-center gap-3'>
            <div className='w-14 h-14 relative'>
              <Image
                src='/images/logos/Latter.svg'
                alt='편지 아이콘'
                width={56}
                height={56}
                className='w-14 h-14'
                priority
              />
            </div>
            <div className='flex flex-col justify-center items-center gap-1'>
              <div className='text-gray-900 text-xl font-semibold font-["Pretendard"] leading-7'>
                친구를 초대하시겠어요?
              </div>
              <div className='text-center'>
                <span className='text-gray-400 text-xs font-medium font-["Pretendard"] leading-none tracking-tight'>
                  최대{" "}
                </span>
                <span className='text-primary text-xs font-medium font-["Pretendard"] leading-none tracking-tight'>
                  6명
                </span>
                <span className='text-gray-400 text-xs font-medium font-["Pretendard"] leading-none tracking-tight'>
                  까지 함께할 수 있어요!
                </span>
              </div>
            </div>
          </div>
          <div className='w-full'>
            <button
              type='button'
              onClick={handleCopyLink}
              className='w-full px-8 py-3 bg-primary rounded-[10px] flex justify-center items-center gap-2.5 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <div className='text-white text-sm font-medium font-["Pretendard"] leading-tight tracking-tight'>
                링크 복사
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
