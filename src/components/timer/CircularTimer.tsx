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
      <div className='w-72 h-72 rounded-full border-[3px] border-gray-100' />
      {elapsedTime > 0 && (
        <div
          className='w-72 h-72 rounded-full absolute'
          style={{
            backgroundImage: `conic-gradient(from 0deg, rgb(85, 122, 243) 0deg, rgb(85, 122, 243) ${progressPercentage * 3.6}deg, transparent ${progressPercentage * 3.6}deg, transparent 360deg)`,
            borderRadius: "50%",
            border: "3px solid transparent",
            backgroundClip: "padding-box",
          }}
        />
      )}
      <div className='w-64 h-64 bg-white rounded-full shadow-[inset_2px_8px_19px_2px_rgba(189,208,255,1.00)] absolute' />
    </div>
  );
}
