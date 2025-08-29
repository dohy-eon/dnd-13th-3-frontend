"use client";

import Image from "next/image";
import { useState } from "react";
import type {
  CurrentChallenge,
  GetChallengeHistoryResponse,
} from "@/lib/challenge";
import type { UserProfileResponse } from "@/types/auth";
import { ChallengeHistoryTab } from "./ChallengeHistoryTab";

interface ChallengeOngoingProps {
  challenge: CurrentChallenge;
  userProfile: UserProfileResponse | null;
  challengeHistory: GetChallengeHistoryResponse | null;
}

export default function ChallengeOngoing({
  challenge,
  userProfile,
  challengeHistory,
}: ChallengeOngoingProps) {
  const [activeTab, setActiveTab] = useState<"current" | "past">("current");

  const sortedParticipants = [...challenge.participants].sort(
    (a, b) => a.current_time_minutes - b.current_time_minutes
  );

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
  };

  const currentUser =
    challenge.participants.find(
      (participant) => participant.userId.toString() === userProfile?.id
    ) || null;

  const getCharacterImage = (characterIndex?: number) => {
    const index = characterIndex || 1;
    return `/images/logos/ChallengingCharater${index}.svg`;
  };

  const handleTabChange = (tab: "current" | "past") => {
    setActiveTab(tab);
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='h-[400px]'>
        <div className='mx-auto bg-white mt-4 rounded-3xl px-[12px] py-[6px] relative z-30 w-fit'>
          <div className='flex items-center justify-center gap-2'>
            <Image
              src='/images/logos/Flag.svg'
              alt='챌린지'
              width={24}
              height={24}
              priority
            />
            <span className='text-lg font-semibold text-gray-900'>
              {challenge.title}
            </span>
          </div>
        </div>
        <div className='flex-1 relative'>
          <div className='flex flex-col items-center justify-end w-full h-full relative'>
            <div className='absolute bottom-0 left-0 right-0 flex items-end justify-center'>
              <div className='w-full min-h-[360px] relative'>
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
                  priority
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
                        priority
                      />
                    </div>
                    <div className='justify-start text-gray-600 text-sm font-normal leading-tight tracking-tight ml-1'>
                    목표 {Math.round(
                        ((challenge.goal_time_minutes * 7) / 60) * 10
                      ) / 10}
                      시간 중
                    </div>
                  </div>
                </div>
                <div className='flex flex-row justify-between mt-2'>
                  <div className='text-gray-900 text-3xl font-medium leading-10'>
                    {formatTime(currentUser?.current_time_minutes || 0)}
                  </div>
                  <div className='bg-indigo-300 rounded-2xl px-3 py-2 flex items-center gap-2'>
                    <Image
                      src='/images/logos/AddPeople.svg'
                      alt='친구추가'
                      width={20}
                      height={20}
                      priority
                    />
                    <span className='text-blue-700 text-xs font-medium'>
                     친구 초대
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white rounded-t-3xl h-[calc(100vh-380px)] relative z-10 -mt-[60px]'>
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
        <div className='overflow-y-auto h-[calc(100%-80px)]'>
          {activeTab === "current" && (
            <div className='pt-4 pb-[100px]'>
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
                    className={`flex items-center gap-4 px-6 py-2 ${
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
                          priority
                        />
                      )}
                      {rank === 2 && (
                        <Image
                          src='/images/logos/MedalSecond.svg'
                          alt='2위'
                          width={32}
                          height={32}
                          priority
                        />
                      )}
                      {rank === 3 && (
                        <Image
                          src='/images/logos/MedalThird.svg'
                          alt='3위'
                          width={32}
                          height={32}
                          priority
                        />
                      )}
                      {rank > 3 && (
                        <div className='w-9 h-9 flex items-center justify-center text-base font-medium text-primary'>
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
                        priority
                      />
                    </div>
                    <div className='flex-1'>
                      <div className='font-medium text-gray-900'>
                        {participant.nickname}
                      </div>
                      <div className='flex items-center justify-between'>
                        <div
                          className={`text-sm ${participant.current_time_minutes > (challenge.goal_time_minutes * 7) ? "text-red-400" : "text-gray-600"}`}
                        >
                          {timeText}
                        </div>
                        <div
                          className={`justify-start text-xs font-medium font-['Pretendard'] leading-none tracking-tight ${participant.current_time_minutes > (challenge.goal_time_minutes * 7) ? "text-red-400" : "text-gray-400"}`}
                        >
                          {Math.min(
                            100,
                            Math.ceil(
                              (participant.current_time_minutes /
                                (challenge.goal_time_minutes * 7)) *
                                100
                            )
                          )}
                          %
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
                            style={{
                              width: `${Math.min(100, Math.round((participant.current_time_minutes / (challenge.goal_time_minutes * 7)) * 100))}%`,
                            }}
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
            <div className='px-6 pt-4 pb-[100px]'>
              <ChallengeHistoryTab challengeHistory={challengeHistory} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
