"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChallengeSuccess() {
  const router = useRouter();
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [challengeData, setChallengeData] = useState<{
    title: string;
    goalTimeHours: number;
    startDate: string;
    endDate: string;
  } | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("challengeData");
    if (storedData) {
      setChallengeData(JSON.parse(storedData));
    } else {
      router.push("/challenge");
    }
  }, [router]);

  const handleCopyLink = async () => {
    try {
      const dummyLink = "https://example.com/challenge/invite/123";
      await navigator.clipboard.writeText(dummyLink);
      setIsLinkCopied(true);

      setTimeout(() => setIsLinkCopied(false), 2000);
    } catch (error) {
      console.error("링크 복사 실패:", error);
    }
  };

  const handleGoBack = () => {
    router.push("/challenge");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  };

  if (!challengeData) {
    return (
      <div className='flex flex-col h-full bg-white items-center justify-center'>
        <div className='text-gray-500'>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full bg-white'>
      <div className='flex justify-center pt-32 pb-8'>
        <div className='w-32 h-32 relative'>
          <Image
            src='/images/logos/ChallengeCreate.svg'
            alt='Challenge Create Icon'
            fill
            className='object-contain'
          />
        </div>
      </div>
      <div className='text-center mb-8 px-5'>
        <h2 className='text-xl font-semibold text-primary mb-2'>
          오늘부터 챌린지 시작!
        </h2>
        <p className='text-sm font-medium text-gray-800 mb-2'>
          챌린지가 완성되었어요! <br /> 이제 친구들을 초대해볼까요?
        </p>
      </div>
      <div className='bg-gray-100 rounded-2xl p-4 mb-8 mx-5'>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <span className='text-sm text-gray-600'>챌린지 기간</span>
            <span className='text-sm font-medium text-gray-900'>
              {formatDate(challengeData.startDate)} ~{" "}
              {formatDate(challengeData.endDate)}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-sm text-gray-600'>목표 시간</span>
            <div className='flex items-center gap-1'>
              <span className='text-sm font-medium text-gray-900'>
                {challengeData.goalTimeHours * 7}시간
              </span>
              <div className="justify-start text-gray-500 text-xs font-medium font-['Pretendard'] leading-none tracking-tight">
                · 하루 {challengeData.goalTimeHours}시간
              </div>
            </div>
          </div>
          <div className='flex justify-between'>
            <span className='text-sm text-gray-600'>함께하는 목표</span>
            <span className='text-sm font-medium text-gray-900'>
              {challengeData.title}
            </span>
          </div>
        </div>
      </div>
      <div className='mt-auto px-5 pb-8'>
        <p className='text-sm text-gray-600 text-center mb-3 px-5'>
          친구는 나중에도 초대할 수 있어요!
        </p>
        <div className='flex justify-center gap-3'>
          <button
            type='button'
            onClick={handleGoBack}
            className='flex-1 px-2.5 py-3.5 bg-gray-100 rounded-xl inline-flex justify-center items-center gap-2.5'
          >
            <div className='text-gray-400 text-base font-medium'>
              화면으로 돌아가기
            </div>
          </button>
          <button
            type='button'
            onClick={handleCopyLink}
            className='flex-1 px-2.5 py-3.5 bg-primary rounded-xl inline-flex justify-center items-center gap-2.5'
          >
            <div className='text-white text-base font-semibold'>링크 복사</div>
          </button>
        </div>
      </div>
      {isLinkCopied && (
        <div className='fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50'>
          <div className='w-80 py-3 bg-neutral-900/90 rounded-lg inline-flex justify-center items-center gap-1.5'>
            <Image
              src='/images/logos/CopyLink.svg'
              alt='Copy Link'
              width={24}
              height={24}
            />
            <div className='text-white text-sm font-medium'>
              링크 복사가 완료되었습니다.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
