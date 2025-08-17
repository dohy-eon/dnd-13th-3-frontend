"use client";

import Image from "next/image";

interface StatsCardsProps {
  targetTime: {
    hours: number;
    minutes: number;
  };
  openModal: () => void;
  isOverTime: boolean;
  todayScreenTime: number;
  goalScreenTime: number;
}

export default function StatsCards({
  targetTime,
  openModal,
  isOverTime,
  todayScreenTime,
  goalScreenTime,
}: StatsCardsProps) {
  const successRateIconSrc = isOverTime
    ? "/images/logos/Fire.svg"
    : "/images/logos/Icon/Normal/Star.svg";
  const successRateAltText = isOverTime ? "목표 시간 초과" : "오늘의 성공률";

  const cardTitle = isOverTime ? "초과시간" : "오늘의 성공률";

  const formatTime = (minutes: number) => {
    if (minutes < 0) minutes = 0;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}시간 ${m}분` : `${h}시간`;
  };

  const cardValue = (() => {
    if (isOverTime) {
      return formatTime(todayScreenTime - goalScreenTime);
    }
    if (goalScreenTime > 0) {
      return `${Math.round((todayScreenTime / goalScreenTime) * 100)}%`;
    }
    return "0%";
  })();
  return (
    <div className='w-full flex justify-center items-center gap-2'>
      {/* 목표 시간 카드 */}
      <div className='w-40 px-5 py-3 bg-gray-100 rounded-2xl flex justify-start items-start gap-1'>
        <div className='flex flex-col justify-start items-start gap-2'>
          {/* 타이머 + 텍스트 */}
          <div className='flex justify-start items-center gap-1'>
            <Image
              src='/images/logos/Icon/Normal/Clock.svg'
              alt='목표 시간'
              width={16}
              height={16}
            />
            <div className='text-gray-400 text-sm font-medium font-pretendard leading-tight tracking-tight'>
              목표 시간
            </div>
          </div>
          {/* 시간 + 연필 */}
          <div className='w-32 flex justify-between items-center'>
            <div className='text-gray-900 text-xl font-semibold font-pretendard leading-7'>
              {targetTime.minutes > 0
                ? `${targetTime.hours}시간 ${targetTime.minutes}분`
                : `${targetTime.hours}시간`}
            </div>
            <button
              type='button'
              onClick={openModal}
              className='cursor-pointer'
            >
              <Image
                src='/images/logos/Icon/Normal/Pencil.svg'
                alt='수정'
                width={18}
                height={18}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 오늘의 성공률 카드 */}
      <div className='w-40 px-5 py-3 bg-gray-100 rounded-2xl flex justify-start items-center gap-1'>
        <div className='flex flex-col justify-start items-start gap-2'>
          {/* 별 + 텍스트 */}
          <div className='flex justify-start items-center gap-1'>
            <Image
              src={successRateIconSrc}
              alt={successRateAltText}
              width={16}
              height={16}
            />
            <div className='text-gray-400 text-sm font-medium font-pretendard leading-tight tracking-tight'>
              {cardTitle}
            </div>
          </div>
          {/* 성공률 */}
          <div className='text-gray-900 text-xl font-semibold font-pretendard leading-7'>
            {cardValue}
          </div>
        </div>
      </div>
    </div>
  );
}
