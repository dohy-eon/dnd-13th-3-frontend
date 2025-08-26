"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { joinChallenge } from "@/lib/api/challenge";
import type { JoinChallengeResponse } from "@/lib/challenge";

export default function JoinChallengeClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [challengeInfo, setChallengeInfo] =
    useState<JoinChallengeResponse | null>(null);

  const inviteCode = searchParams.get("code");

  useEffect(() => {
    if (!inviteCode) {
      setError("초대 코드가 없습니다.");
      return;
    }

    const handleJoinChallenge = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await joinChallenge(inviteCode);
        setChallengeInfo(response);
        console.log("✅ 챌린지 참여 성공:", response);
      } catch (error) {
        console.error("❌ 챌린지 참여 실패:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "챌린지 참여에 실패했습니다.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    handleJoinChallenge();
  }, [inviteCode]);

  const handleGoToChallenge = () => {
    if (challengeInfo) {
      router.push(`/challenge`);
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  if (!inviteCode) {
    return (
      <div className='min-h-screen flex flex-col bg-primary'>
        <div className='flex-1 flex items-center justify-center px-6'>
          <div className='text-center'>
            <div className='w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4' />
            <p className='text-white text-lg font-medium'>
              초대 코드를 확인하는 중...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='min-h-screen flex flex-col bg-primary'>
        <div className='flex-1 flex items-center justify-center px-6'>
          <div className='text-center'>
            <div className='w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4' />
            <p className='text-white text-lg font-medium'>
              챌린지에 참여하는 중...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex flex-col bg-primary'>
        <div className='flex-1 flex items-center justify-center px-6'>
          <div className='text-center'>
            <div className='w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Image
                src='/images/logos/Error.svg'
                alt='Error'
                width={40}
                height={40}
                className='text-white'
              />
            </div>
            <h1 className='text-white text-xl font-bold mb-3'>참여 실패</h1>
            <p className='text-white text-base mb-8 text-center'>{error}</p>
          </div>
        </div>
        <div className='pb-8 px-6'>
          <button
            type='button'
            onClick={handleGoHome}
            className='w-full px-6 py-3.5 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition-colors'
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  if (challengeInfo) {
    return (
      <div className='min-h-screen flex flex-col bg-primary'>
        <div className='flex-1 flex items-center justify-center px-6'>
          <div className='text-center w-full max-w-sm'>
            <div className='w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6'>
              <Image
                src='/images/logos/ChallengeIcon.svg'
                alt='Success'
                width={40}
                height={40}
                className='text-white'
              />
            </div>
            <h1 className='text-white text-xl font-bold mb-3'>참여 성공!</h1>
            <p className='text-white text-base mb-6 text-center'>
              {challengeInfo.data.message}
            </p>

            <div className='bg-white/10 rounded-2xl p-5 mb-8'>
              <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-white/80 text-sm font-medium'>
                    챌린지 제목
                  </span>
                  <span className='text-white font-semibold text-right flex-1 ml-4'>
                    {challengeInfo.data.title}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-white/80 text-sm font-medium'>
                    시작일
                  </span>
                  <span className='text-white font-semibold'>
                    {challengeInfo.data.start_date}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-white/80 text-sm font-medium'>
                    종료일
                  </span>
                  <span className='text-white font-semibold'>
                    {challengeInfo.data.end_date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='pb-8 px-6'>
          <button
            type='button'
            onClick={handleGoToChallenge}
            className='w-full px-6 py-3.5 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition-colors'
          >
            챌린지 보러가기
          </button>
        </div>
      </div>
    );
  }

  return null;
}
