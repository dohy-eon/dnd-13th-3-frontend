"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type {
  ChallengeHistory,
  GetChallengeHistoryResponse,
} from "@/lib/challenge";
import type { UserProfileResponse } from "@/types/auth";

interface ChallengeDetailClientProps {
  challenge: ChallengeHistory;
  challengeHistory: GetChallengeHistoryResponse | null;
  userProfile: UserProfileResponse | null;
}

export function ChallengeDetailClient({
  challenge,
  userProfile,
}: ChallengeDetailClientProps) {
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
    if (mins === 0) {
      return `${hours}시간`;
    }
    return `${hours}시간 ${mins}분`;
  };

  const getCharacterImage = (characterIndex: number) => {
    return `/images/logos/Charater${characterIndex}.svg`;
  };

  const getCharacterImageSecond = (characterIndex: number) => {
    return `/images/logos/ChallengedCharater${characterIndex}.svg`;
  };

  const sortedParticipants = [...challenge.participants].sort(
    (a, b) => b.achievement_rate - a.achievement_rate
  );

  const top3 = sortedParticipants.slice(0, 3);

  return (
    <div className='flex flex-col h-[100dvh] bg-primary'>
      <div className='relative px-4 py-6 flex items-center'>
        <button type='button' onClick={handleBack} className='absolute left-4'>
          <Image
            src='/images/logos/BackBtnWhite.svg'
            alt='뒤로가기'
            width={12}
            height={22}
            priority
            className='w-3 h-[22px] object-contain'
          />
        </button>
      </div>
      <div className='flex-1 px-4 pb-6 overflow-y-auto'>
        <div className='mb-8 text-center'>
          <h1 className='text-white text-xl font-semibold mb-2'>
            {challenge.title}
          </h1>
          <p className='text-gray-200 text-sm font-normal'>
            {formatDate(challenge.start_date)} -{" "}
            {formatDate(challenge.end_date)}
          </p>
        </div>
        <div className='mb-8'>
          <div className='flex justify-center items-end gap-4 relative'>
            {top3[0] && (
              <div className='flex flex-col items-center'>
                <div className='relative w-[120px] h-[138px] mb-2'>
                  <Image
                    src='/images/logos/ChallengeFirst.svg'
                    alt='1등'
                    fill
                    className='object-contain z-50'
                  />
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <Image
                      src={getCharacterImage(top3[0].characterIndex)}
                      alt='캐릭터'
                      width={100}
                      height={100}
                      className='rounded-full pt-[4px] z-10'
                    />
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-white text-base font-medium mb-1'>
                    {top3[0].nickname}
                  </div>
                  <div className='text-gray-200 text-xs font-medium '>
                    {formatTime(top3[0].current_time_minutes)}
                  </div>
                </div>
              </div>
            )}
            <div className='absolute left-1/4 transform -translate-x-1/2'>
              {top3[1] ? (
                <div className='flex flex-col items-center'>
                  <div className='relative w-[64px] h-[82px] mb-2'>
                    <Image
                      src='/images/logos/ChallengeSecond.svg'
                      alt='2등'
                      fill
                      className='object-contain z-50'
                    />
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <Image
                        src={getCharacterImage(top3[1].characterIndex)}
                        alt='캐릭터'
                        width={64}
                        height={64}
                        className='rounded-full pb-[15px] z-10'
                      />
                    </div>
                  </div>
                  <div className='text-center'>
                    <div className='text-white text-base font-medium  mb-1'>
                      {top3[1].nickname}
                    </div>
                    <div className='text-gray-200 text-xs font-medium '>
                      {formatTime(top3[1].current_time_minutes)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className='w-16 h-16' />
              )}
            </div>
            <div className='absolute right-1/4 transform translate-x-1/2'>
              {top3[2] ? (
                <div className='flex flex-col items-center'>
                  <div className='relative w-[64px] h-[82px] mb-2'>
                    <Image
                      src='/images/logos/ChallengeThird.svg'
                      alt='3등'
                      fill
                      className='object-contain z-50'
                    />
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <Image
                        src={getCharacterImage(top3[2].characterIndex)}
                        alt='캐릭터'
                        width={64}
                        height={64}
                        className='rounded-full pb-[15px] z-10'
                      />
                    </div>
                  </div>
                  <div className='text-center'>
                    <div className='text-white text-base font-medium mb-1'>
                      {top3[2].nickname}
                    </div>
                    <div className='text-gray-200 text-xs font-medium '>
                      {formatTime(top3[2].current_time_minutes)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className='w-16 h-16' />
              )}
            </div>
          </div>
        </div>
        <div>
          <h2 className='text-white text-lg font-semibold mb-4'>최종 랭킹</h2>
          <div className='space-y-3'>
            {sortedParticipants.map((participant, index) => {
              const rank = index + 1;
              const isMe =
                userProfile && participant.userId.toString() === userProfile.id;

              return (
                <div
                  key={participant.userId}
                  className={`rounded-xl px-4 py-3 flex items-center gap-3 ${
                    isMe ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <div className='w-[36px] h-[36px] flex items-center justify-center'>
                    {rank === 1 ? (
                      <Image
                        src='/images/logos/MedalFirst.svg'
                        alt='1등'
                        width={36}
                        height={36}
                      />
                    ) : rank === 2 ? (
                      <Image
                        src='/images/logos/MedalSecond.svg'
                        alt='2등'
                        width={36}
                        height={36}
                      />
                    ) : rank === 3 ? (
                      <Image
                        src='/images/logos/MedalThird.svg'
                        alt='3등'
                        width={36}
                        height={36}
                      />
                    ) : (
                      <div className='w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center'>
                        <span className='text-white text-xs font-bold'>
                          {rank}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className='w-[44px] h-[44px]'>
                    <Image
                      src={getCharacterImageSecond(participant.characterIndex)}
                      alt='캐릭터'
                      width={44}
                      height={44}
                      className='rounded-full'
                    />
                  </div>
                  <div className='flex-1'>
                    <div className='flex flex-row items-center justify-between'>
                      <div className='text-sm font-medium text-gray-900'>
                        {participant.nickname}
                      </div>
                      <div className='text-xs text-gray-500'>
                        {formatTime(participant.current_time_minutes)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
