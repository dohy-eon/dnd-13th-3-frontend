"use client";

interface TimeDisplayProps {
  elapsedTime: number;
}

export default function TimeDisplay({ elapsedTime }: TimeDisplayProps) {
  const formatTime = (time: number) => {
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className='absolute flex flex-col items-center justify-center'>
      <div className='text-4xl font-bold text-gray-900 mb-2'>
        {formatTime(elapsedTime)}
      </div>
      <div className='text-sm text-gray-600'>
        {elapsedTime === 0 ? "함께 시작해볼까요?" : "잘하고있어요!"}
      </div>
    </div>
  );
}
