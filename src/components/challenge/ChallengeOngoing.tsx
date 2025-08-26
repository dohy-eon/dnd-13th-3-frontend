"use client";

import Image from "next/image";
import { useState } from "react";
import type { Challenge } from "@/lib/challenge";
import type { UserProfileResponse } from "@/types/auth";

interface ChallengeOngoingProps {
  challenge: Challenge;
  userProfile: UserProfileResponse | null;
}

export default function ChallengeOngoing({
  challenge,
  userProfile,
}: ChallengeOngoingProps) {
  const [activeTab, setActiveTab] = useState<"current" | "past">("current");

  const sortedParticipants = [...challenge.participants].sort(
    (a, b) => b.current_time_minutes - a.current_time_minutes
  );

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
  };

  const currentUser = challenge.participants[0];

  const getCharacterImage = (characterIndex?: number) => {
    const index = characterIndex || 1;
    return `/images/logos/ChallengingCharater${index}.svg`;
  };

  const handleTabChange = (tab: "current" | "past") => {
    setActiveTab(tab);
    // TODO: 지난 챌린지 탭 클릭 시 SSR로 데이터 패칭
    if (tab === "past") {
      console.log("지난 챌린지 데이터 패칭 필요");
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='mx-auto bg-white mt-4 rounded-3xl px-[12px] py-[6px]'>
        <div className='flex items-center justify-center gap-3'>
          <Image
            src='/images/logos/Flag.svg'
            alt='챌린지'
            width={24}
            height={24}
          />
          <span className='text-lg font-semibold text-gray-900'>
            {challenge.title}
          </span>
        </div>
      </div>
      <div className='flex-1 relative'>
        <div className='flex flex-col items-center justify-end w-full h-full relative'>
          <div className='absolute bottom-0 left-0 right-0 flex items-end justify-center'>
            <div className='w-full min-h-[334px] relative'>
              <Image
                src='/images/logos/ChallengeBack.svg'
                alt='Challenge Background'
                fill
                className='object-cover'
                priority
              />
            </div>
          </div>
          <div className='relative z-20'>
            <div className='w-60 h-48 relative'>
              <Image
                src={getCharacterImage(userProfile?.characterIndex)}
                alt='도전하는 캐릭터'
                fill
                className='object-contain'
              />
            </div>
          </div>
          <div className='w-full relative z-20 mb-8'>
            <div className='w-full mx-auto rounded-2xl px-6 pb-12'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <div className='flex items-center'>
                    <Image
                      src='/images/logos/Hourglass.svg'
                      alt='모래시계'
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className='justify-start text-gray-500 text-sm font-medium ml-1'>
                    현재 누적 스크린타임
                  </div>
                </div>
              </div>
              <div className='flex flex-row justify-between mt-2'>
                <div className='text-3xl font-bold text-black'>
                  {formatTime(currentUser.current_time_minutes)}
                </div>
                <div className='bg-indigo-300 rounded-2xl px-3 py-2 flex items-center gap-2'>
                  <Image
                    src='/images/logos/Clock.svg'
                    alt='시계'
                    width={20}
                    height={20}
                  />
                  <span className='text-blue-700 text-xs font-medium'>
                    {Math.floor(challenge.goal_time_minutes / 60)}시간
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white rounded-t-3xl flex-1 relative z-10 -mt-12 pb-40'>
        <div className='w-full h-16 pb-4 mx-auto pt-6 px-6'>
          <div className='w-full px-1.5 py-1 bg-gray-100 rounded-[30px] flex justify-between items-center relative'>
            <div
              className={`absolute top-1 bottom-1 bg-white rounded-[30px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.09)] transition-all duration-300 ease-in-out ${
                activeTab === "current"
                  ? "left-1.5 w-[calc(50%-0.75rem)]"
                  : "left-[calc(50%+0.75rem)] w-[calc(50%-0.75rem)]"
              }`}
            />
            <button
              type='button'
              onClick={() => handleTabChange("current")}
              className={`relative z-10 flex-1 px-6 py-2 rounded-[30px] flex justify-center items-center transition-colors duration-300 ${
                activeTab === "current"
                  ? "text-gray-900 font-semibold"
                  : "text-gray-400 font-medium"
              }`}
            >
              현재 랭킹
            </button>
            <button
              type='button'
              onClick={() => handleTabChange("past")}
              className={`relative z-10 flex-1 px-6 py-2 rounded-[30px] flex justify-center items-center transition-colors duration-300 ${
                activeTab === "past"
                  ? "text-gray-900 font-semibold"
                  : "text-gray-400 font-medium"
              }`}
            >
              지난 챌린지
            </button>
          </div>
        </div>
        {activeTab === "current" && (
          <div className='mt-6 overflow-y-auto'>
            {sortedParticipants.map((participant, index) => {
              const rank = index + 1;
              const hours = Math.floor(participant.current_time_minutes / 60);
              const minutes = participant.current_time_minutes % 60;
              const timeText =
                hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
              const isCurrentUser =
                participant.userId.toString() === userProfile?.id;

              return (
                <div
                  key={participant.userId}
                  className={`flex items-center gap-4 px-6 py-2 rounded-xl ${
                    isCurrentUser ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className='flex-shrink-0'>
                    {rank === 1 && (
                      <Image
                        src='/images/logos/MedalFirst.svg'
                        alt='1위'
                        width={32}
                        height={32}
                      />
                    )}
                    {rank === 2 && (
                      <Image
                        src='/images/logos/MedalSecond.svg'
                        alt='2위'
                        width={32}
                        height={32}
                      />
                    )}
                    {rank === 3 && (
                      <Image
                        src='/images/logos/MedalThird.svg'
                        alt='3위'
                        width={32}
                        height={32}
                      />
                    )}
                    {rank > 3 && (
                      <div className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600'>
                        {rank}
                      </div>
                    )}
                  </div>
                  <div className='w-12 h-12 relative'>
                    <Image
                      src={`/images/logos/Charater${participant.characterIndex || 1}.svg`}
                      alt={`${participant.nickname}의 캐릭터`}
                      fill
                      className='object-contain'
                    />
                  </div>
                  <div className='flex-1'>
                    <div className='font-medium text-gray-900'>
                      {participant.nickname}
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className='text-sm text-gray-600'>{timeText}</div>
                      <div className="justify-start text-gray-400 text-xs font-medium font-['Pretendard'] leading-none tracking-tight">
                        {participant.achievement_rate}%
                      </div>
                    </div>
                    <div className='mt-2'>
                      <div className='flex-1 h-2 relative rounded'>
                        <div
                          className={`w-full h-2 left-0 top-0 absolute rounded ${
                            isCurrentUser ? "bg-white" : "bg-gray-100"
                          }`}
                        />
                        <div
                          className={`h-2 left-0 top-0 absolute rounded transition-all duration-300 ${
                            isCurrentUser ? "bg-gray-500" : "bg-gray-300"
                          }`}
                          style={{ width: `${participant.achievement_rate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {activeTab === "past" && (
          <div className='text-center py-8 text-gray-500'>
            지난 챌린지 데이터를 불러오는 중...
          </div>
        )}
      </div>
    </div>
  );
}
