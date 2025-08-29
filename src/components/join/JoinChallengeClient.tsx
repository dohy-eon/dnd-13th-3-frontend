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
    router.push("/main");
  };

  if (!inviteCode) {
    return (
      <div className='min-h-screen flex flex-col bg-white'>
        <div className='flex-1 flex items-center justify-center px-6'>
          <div className='text-center'>
            <div className='w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4' />
            <p className='text-gray-900 text-lg font-medium'>
              초대 코드를 확인하는 중...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='min-h-screen flex flex-col bg-white'>
        <div className='flex-1 flex items-center justify-center px-6'>
          <div className='text-center'>
            <div className='w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4' />
            <p className='text-gray-900 text-lg font-medium'>
              챌린지에 참여하는 중...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    if (error.includes("본인이 생성한 챌린지에는 참여할 수 없습니다")) {
      return (
        <div className='min-h-screen flex flex-col bg-white'>
          <div className='flex-1 flex items-center justify-center px-6'>
            <div className='text-center w-full max-w-sm'>
              <div className='flex items-center justify-center mx-auto mb-6'>
                <Image
                  src='/images/logos/ChallengeCantJoin.svg'
                  alt='Cannot Join'
                  width={96}
                  height={96}
                  priority
                />
              </div>
              <div className='inline-flex flex-col justify-start items-start gap-2'>
                <div className='text-center justify-start text-primary text-xl font-semibold leading-loose'>
                  해당 링크로 입장이 어려워요..
                </div>
                <div className='text-center justify-start text-gray-800 text-sm font-medium leading-tight tracking-tight'>
                  내가 만든 챌린지는 링크로 입장할 수 없어요.
                  <br />앱 내에서 재입장해주세요!
                </div>
              </div>
            </div>
          </div>
          <div className='pb-8 px-6'>
            <button
              type='button'
              onClick={handleGoHome}
              className='w-full px-6 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors'
            >
              홈으로
            </button>
          </div>
        </div>
      );
    }

    if (error.includes("이미 참여한 챌린지입니다")) {
      return (
        <div className='min-h-screen flex flex-col bg-white'>
          <div className='flex-1 flex items-center justify-center px-6'>
            <div className='text-center w-full max-w-sm'>
              <div className='flex items-center justify-center mx-auto mb-6'>
                <Image
                  src='/images/logos/ChallengeCantJoin.svg'
                  alt='Already Joined'
                  width={96}
                  height={96}
                  priority
                />
              </div>
              <div className='inline-flex flex-col justify-start items-start gap-2'>
                <div className='text-center justify-start text-primary text-xl font-semibold leading-loose'>
                  이미 챌린지에 참여하셨습니다
                </div>
              </div>
            </div>
          </div>
          <div className='pb-8 px-6'>
            <button
              type='button'
              onClick={handleGoHome}
              className='w-full px-6 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors'
            >
              홈으로
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className='min-h-screen flex flex-col bg-white'>
        <div className='flex-1 flex items-center justify-center px-6'>
          <div className='text-center'>
            <div className='w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Image
                src='/images/logos/Error.svg'
                alt='Error'
                width={40}
                height={40}
                priority
                className='text-white'
              />
            </div>
            <h1 className='text-gray-900 text-xl font-bold mb-3'>참여 실패</h1>
            <p className='text-gray-600 text-base mb-8 text-center'>{error}</p>
          </div>
        </div>
        <div className='pb-8 px-6'>
          <button
            type='button'
            onClick={handleGoHome}
            className='w-full px-6 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors'
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  if (challengeInfo) {
    return (
      <div className='min-h-screen flex flex-col bg-white'>
        <div className='flex-1 flex items-center justify-center px-6'>
          <div className='text-center w-full max-w-sm'>
            <div className='w-[94px] h-[94px] flex items-center justify-center mx-auto mb-6'>
              <Image
                src='/images/logos/Latter.svg'
                alt='Success'
                width={94}
                height={94}
                priority
              />
            </div>
            <div className='w-80 inline-flex flex-col text-center gap-2 mb-8'>
              <div className='text-center justify-start text-primary text-xl font-semibold leading-loose'>
                챌린지에 초대 되었습니다!
              </div>
              <div className='text-center justify-start text-gray-800 text-sm font-medium leading-tight tracking-tight'>
                챌린지에 함께 참여해볼까요?
              </div>
            </div>

            <div className='w-80 py-4 bg-gray-100 rounded-xl inline-flex flex-col justify-start items-center gap-4 mb-8'>
              <div className='w-72 inline-flex justify-between items-center'>
                <div className='text-center justify-start text-gray-400 text-sm font-medium leading-tight tracking-tight'>
                  챌린지 기간
                </div>
                <div className='text-center justify-start text-gray-800 text-sm font-medium leading-tight tracking-tight'>
                  {challengeInfo.data.start_date} ~{" "}
                  {challengeInfo.data.end_date}
                </div>
              </div>
              <div className='w-72 inline-flex justify-between items-center'>
                <div className='text-center justify-start text-gray-400 text-sm font-medium leading-tight tracking-tight'>
                  목표 시간
                </div>
                <div className='flex items-center gap-1'>
                  <span className='text-sm font-medium text-gray-900'>
                    {Math.round(
                      (challengeInfo.data.goal_time_minutes / 60) * 7 * 10
                    ) / 10}
                    시간
                  </span>
                  <div className="justify-start text-gray-500 text-xs font-medium leading-none tracking-tight">
                    · 하루{" "}
                    {Math.round(
                      (challengeInfo.data.goal_time_minutes / 60) * 10
                    ) / 10}
                    시간
                  </div>
                </div>
              </div>
              <div className='w-72 inline-flex justify-between items-center'>
                <div className='text-center justify-start text-gray-400 text-sm font-medium leading-tight tracking-tight'>
                  함께하는 목표
                </div>
                <div className='text-center justify-start text-gray-800 text-sm font-medium leading-tight tracking-tight'>
                  {challengeInfo.data.title}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='pb-8 px-6'>
          <button
            type='button'
            onClick={handleGoToChallenge}
            className='w-full px-6 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors'
          >
            챌린지 참가하기
          </button>
        </div>
      </div>
    );
  }

  return null;
}
