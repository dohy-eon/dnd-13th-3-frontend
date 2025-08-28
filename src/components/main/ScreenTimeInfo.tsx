"use client";

import Image from "next/image";

interface ScreenTimeInfoProps {
  goal: string;
  openModal: () => void;
  todayScreenTime: number;
}

export default function ScreenTimeInfo({
  goal,
  openModal,
  todayScreenTime,
}: ScreenTimeInfoProps) {
  return (
    <button
      type='button'
      className='relative justify-center items-center cursor-pointer text-left w-full'
      onClick={openModal}
    >
      <div className='absolute left-1/2 top-[32px] transform -translate-x-1/2 text-center'>
        <div className='text-gray-500 text-sm font-medium font-pretendard whitespace-nowrap'>
          오늘의 스크린타임
        </div>
        <div className='text-gray-900 text-3xl font-semibold font-pretendard leading-10 whitespace-nowrap'>
          {`${Math.floor(todayScreenTime / 60)}시간 ${todayScreenTime % 60}분`}
        </div>
      </div>

      <div className='absolute left-1/2 transform -translate-x-1/2 px-3 py-2 bg-white rounded-2xl flex items-center gap-1 top-[110px]'>
        <span className='text-gray-500 text-xs font-medium font-pretendard leading-none tracking-tight whitespace-nowrap'>
          {goal}
        </span>
        <Image
          src='/images/logos/Icon/Normal/Pencil.svg'
          alt='수정'
          width={14}
          height={14}
          className='flex-shrink-0'
          priority
        />
      </div>
    </button>
  );
}
