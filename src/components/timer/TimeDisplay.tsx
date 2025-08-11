"use client";

interface TimeDisplayProps {
  elapsedTime: number;
}

export default function TimeDisplay({ elapsedTime }: TimeDisplayProps) {
  const getTimeInfo = (time: number) => {
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { totalSeconds, hours, minutes, seconds };
  };

  const formatTime = (time: number) => {
    const { hours, minutes, seconds } = getTimeInfo(time);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const getMessage = (time: number) => {
    if (time === 0) return "함께 시작해볼까요?";

    const { hours } = getTimeInfo(time);

    if (hours >= 1) {
      return `${hours}시간 달성!`;
    }

    return "잘하고있어요!";
  };

  return (
    <div className='absolute flex flex-col items-center justify-center'>
      <div className='text-center justify-start text-gray-600 text-5xl font-normal mb-2'>
        {formatTime(elapsedTime)}
      </div>
      <div className='text-sm text-gray-600'>{getMessage(elapsedTime)}</div>
    </div>
  );
}
