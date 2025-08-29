"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { UserProfileResponse } from "@/types/auth";

interface ChallengeEmptyStateProps {
  userProfile: UserProfileResponse | null;
  onStartChallenge: () => void;
}

export default function ChallengeEmptyState({
  userProfile,
  onStartChallenge,
}: ChallengeEmptyStateProps) {
  const router = useRouter();
  const nickname = userProfile?.nickname || "미누";
  const displayNickname = nickname.endsWith("님") ? nickname : `${nickname}님`;

  const handleViewHistory = () => {
    router.push("/history");
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 relative'>
        <div className='mt-6 flex items-end justify-center h-full relative'>
          <div className='absolute bottom-0 left-0 right-0 flex items-end justify-center'>
            <div className='w-full min-h-96 relative'>
              <Image
                src='/images/logos/ChallengeBack.svg'
                alt='Challenge Background'
                fill
                className='object-cover'
                priority
              />
            </div>
          </div>
          <div className='absolute bottom-[300px] transform -translate-x-1/3 z-25'>
            <div className='w-[173px] h-[80px] relative'>
              <Image
                src='/images/logos/ChallengeText.svg'
                alt='챌린지 제안 말풍선'
                fill
                className='object-contain'
              />
            </div>
          </div>
          <div className='relative z-20 mb-[100px]'>
            <div className='w-[301px] h-[237px] relative'>
              <Image
                src={"/images/logos/NoChallenge.svg"}
                alt='도전하는 캐릭터'
                fill
                className='object-contain'
                priority
              />
            </div>
          </div>
          <div className='absolute bottom-[4.2rem] left-1/2 transform -translate-x-1/2 z-30'>
            <button
              type='button'
              onClick={handleViewHistory}
              className='px-3 py-2 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-indigo-300 inline-flex justify-center items-center gap-1 overflow-hidden'
            >
              <div className='w-3.5 h-3.5 relative'>
                <Image
                  src='/images/logos/Star.svg'
                  alt='별 아이콘'
                  fill
                  className='object-contain'
                />
              </div>
              <div className="justify-start text-blue-700 text-xs font-medium leading-none tracking-tight">
                지난 챌린지 보기
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className='bg-white pt-6 rounded-t-3xl relative z-30 -mt-8 pb-[100px] px-screen-margin'>
        <div className='mb-8'>
          <div className='flex flex-col justify-start mx-auto'>
            <span className="text-gray-900 text-xl font-semibold leading-7">
              {displayNickname}
            </span>
            <span className="text-gray-900 text-xl font-medium leading-7">
              아직 도전 중인 챌린지가 없어요!
            </span>
          </div>
          <div className='justify-start text-gray-500 text-sm font-medium mt-2'>
            친구들과 함께 챌린지를 시작해보세요!
          </div>
        </div>
        <div className='w-full flex justify-center'>
          <button
            type='button'
            onClick={onStartChallenge}
            className='w-full px-2.5 py-3.5 bg-primary rounded-xl inline-flex justify-center items-center gap-2.5'
          >
            <div className='justify-center text-white text-base font-semibold'>
              챌린지 시작하기
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
