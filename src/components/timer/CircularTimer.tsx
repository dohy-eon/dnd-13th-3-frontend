"use client";

interface CircularTimerProps {
  elapsedTime: number;
  progressPercentage: number;
}

export default function CircularTimer({
  elapsedTime,
  progressPercentage,
}: CircularTimerProps) {
  return (
    <div className='relative flex items-center justify-center mb-8'>
      <div className='w-76 h-76 rounded-full relative'>
        <svg
          className='w-full h-full rotate-[-90deg]'
          viewBox='0 0 100 100'
          role='img'
          aria-label='타이머 진행률'
        >
          <circle
            cx='50'
            cy='50'
            r='47'
            fill='none'
            stroke='#F1F3F5'
            strokeWidth='1'
          />
          {elapsedTime > 0 && (
            <circle
              cx='50'
              cy='50'
              r='47'
              fill='none'
              stroke='#6366f1'
              strokeWidth='2'
              strokeDasharray={`${2 * Math.PI * 47}`}
              strokeDashoffset={`${2 * Math.PI * 47 * (1 - progressPercentage / 100)}`}
              strokeLinecap='round'
              className='transition-all duration-100 ease-out'
            />
          )}
        </svg>
      </div>
      <div className='w-64 h-64 bg-white rounded-full shadow-[inset_2px_8px_19px_2px_rgba(189,208,255,1.00)] absolute' />
    </div>
  );
}
