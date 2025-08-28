"use client";

import Image from "next/image";

interface ResultModalProps {
  mission: string;
  elapsedTime: number;
  onConfirm: () => void;
}

export default function ResultModal({
  mission,
  elapsedTime,
  onConfirm,
}: ResultModalProps) {
  const formatTime = (time: number) => {
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className='fixed inset-0 bg-dim-background flex items-center justify-center z-50 p-4'>
      <div className='w-80 p-5 bg-white rounded-2xl inline-flex flex-col justify-start items-center gap-5'>
        <div className='self-stretch flex flex-col justify-start items-center gap-3'>
          <div className='h-10 relative flex flex-col justify-center items-center'>
            <Image
              src='/images/logos/CircleCheck.svg'
              alt='완료'
              width={40}
              height={40}
            />
          </div>
          <div className='self-stretch flex flex-col justify-center items-center gap-1'>
            <div className='justify-start text-gray-900 text-xl font-semibold leading-7'>
              미션 완료!
            </div>
            <div className='self-stretch text-center justify-start text-gray-400 text-sm font-medium leading-tight tracking-tight'>
              {mission}을(를) 완료했습니다!
            </div>
          </div>
          <div className='w-72 py-3 bg-gray-100 rounded-xl flex flex-col justify-center items-center gap-0.5'>
            <div className='self-stretch text-center justify-start text-gray-400 text-xs font-medium leading-none tracking-tight'>
              집중한 시간
            </div>
            <div className='justify-start text-primary text-2xl font-medium leading-loose'>
              {formatTime(elapsedTime)}
            </div>
          </div>
        </div>
        <div className='self-stretch inline-flex justify-start items-start gap-2'>
          <button
            type='button'
            onClick={onConfirm}
            className='w-72 px-8 py-3 bg-primary rounded-[10px] flex justify-center items-center gap-2.5 overflow-hidden'
          >
            <div className='justify-start text-white text-sm font-medium leading-tight tracking-tight'>
              확인
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
