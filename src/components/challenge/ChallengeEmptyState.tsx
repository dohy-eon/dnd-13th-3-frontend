"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ChallengeEmptyState() {
  const router = useRouter();

  const handleStartChallenge = () => {
    router.push("/challenge/create");
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 relative'>
        <div className='flex items-end justify-center h-full relative'>
          <div className='absolute bottom-0 left-0 right-0 flex items-end justify-center'>
            <div className='w-full min-h-96 relative'>
              <Image
                src='/images/logos/ChallengeBack.svg'
                alt='Challenge Background'
                fill
                className='object-cover'
              />
            </div>
          </div>

          <div className='relative z-20 mb-20'>
            <div className='w-80 h-80 relative'>
              <Image
                src='/images/logos/ChallengeIcon.svg'
                alt='Challenge Icon'
                fill
                className='object-contain'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white py-12 rounded-t-3xl relative z-30 -mt-8 px-screen-margin'>
        <div className='mb-8'>
          <div className='justify-start mx-auto'>
            <span className="text-gray-900 text-xl font-semibold font-['Pretendard'] leading-7">
              미누님,{" "}
            </span>
            <span className="text-gray-900 text-xl font-medium font-['Pretendard'] leading-7">
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
            onClick={handleStartChallenge}
            className='w-full px-2.5 py-3.5 bg-primary rounded-xl inline-flex justify-center items-center gap-2.5 hover:bg-blue-600 transition-colors'
          >
            <div className="justify-center text-white text-base font-semibold font-['Pretendard'] leading-normal tracking-tight">
              챌린지 시작하기
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
