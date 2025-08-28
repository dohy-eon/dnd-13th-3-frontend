"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type {
  GetChallengeHistoryResponse,
  HistoryParticipant,
} from "@/lib/challenge";
import type { UserProfileResponse } from "@/types/auth";

interface ChallengeHistoryClientProps {
  challengeHistory: GetChallengeHistoryResponse | null;
  userProfile: UserProfileResponse | null;
}

export function ChallengeHistoryClient({
  challengeHistory,
}: ChallengeHistoryClientProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  const getAchievementRate = (current: number, goal: number) => {
    if (goal === 0) return 0;
    return Math.round((current / goal) * 100);
  };

  const getFirstPlaceParticipant = (participants: HistoryParticipant[]) => {
    return participants.reduce((prev, current) =>
      prev.achievement_rate > current.achievement_rate ? prev : current
    );
  };

  const challenges = challengeHistory?.data?.challenges || [];

  return (
    <div className='flex flex-col h-full bg-primary'>
      <div className='relative px-4 py-6 flex items-center'>
        <button type='button' onClick={handleBack}>
          <Image
            src='/images/logos/BackBtnWhite.svg'
            alt='뒤로가기'
            width={12}
            height={22}
            priority
            className='w-[12px] h-[22px]'
          />
        </button>
        <h1 className='absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-white'>
          챌린지 기록
        </h1>
      </div>
      <div className='flex-1 px-4 pt-2 pb-6 overflow-y-auto'>
        {!challenges || challenges.length === 0 ? (
          <div className='h-full flex flex-col items-center justify-center'>
            <div className='w-[335px] h-[153px] relative'>
              <Image
                src='/images/logos/ChallengeEmpty.svg'
                alt='챌린지 기록 없음'
                fill
                className='object-contain'
                priority
              />
            </div>
          </div>
        ) : (
          <div className='space-y-4'>
            {challenges.map((challenge) => {
              const firstPlace = getFirstPlaceParticipant(
                challenge.participants
              );
              const achievementRate = getAchievementRate(
                firstPlace.current_time_minutes,
                challenge.goal_time_minutes
              );
              return (
                <button
                  type='button'
                  key={challenge.challengeId}
                  onClick={() =>
                    router.push(`/history/${challenge.challengeId}`)
                  }
                  className='w-full rounded-2xl outline outline-1 outline-gray-200 flex flex-col justify-start items-start text-left'
                >
                  <div className='w-full px-4 py-3 bg-gray-100 rounded-tl-2xl rounded-tr-2xl flex flex-col justify-start items-start gap-1'>
                    <div className='self-stretch justify-start text-gray-900 text-base font-semibold font-["Pretendard"] leading-normal tracking-tight'>
                      {challenge.title}
                    </div>
                    <div className='self-stretch justify-start text-gray-400 text-sm font-medium font-["Pretendard"] leading-tight tracking-tight'>
                      {formatDate(challenge.start_date)} -{" "}
                      {formatDate(challenge.end_date)}
                    </div>
                  </div>
                  <div className='w-full px-4 py-2 rounded-bl-2xl rounded-br-2xl flex flex-col justify-start items-start gap-2 bg-white'>
                    <div className='inline-flex justify-start items-center gap-2'>
                      <div className='w-6 h-6 relative'>
                        <Image
                          src='/images/logos/MedalFirst.svg'
                          alt='1등 메달'
                          width={24}
                          height={24}
                          priority
                        />
                      </div>
                      <div className='justify-start text-gray-500 text-sm font-medium font-["Pretendard"] leading-tight tracking-tight'>
                        {firstPlace.nickname}
                      </div>
                    </div>
                    <div className='self-stretch inline-flex justify-start items-center gap-1.5'>
                      <div className='p-[3px] inline-flex flex-col justify-center items-start gap-2.5'>
                        <Image
                          src='/images/logos/HourglassLast.svg'
                          alt='스크린타임'
                          width={16}
                          height={16}
                          priority
                        />
                      </div>
                      <div className='flex justify-start items-center gap-2'>
                        <div className='justify-start text-gray-500 text-xs font-medium font-["Pretendard"] leading-none tracking-tight'>
                          {formatTime(firstPlace.current_time_minutes)} 사용
                        </div>
                        <div className='justify-start text-primary text-xs font-medium font-["Pretendard"] leading-none tracking-tight'>
                          {achievementRate}%
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
