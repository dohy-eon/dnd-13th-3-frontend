"use client";

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
      <div className='bg-white rounded-2xl p-6 min-w-screen-mobile mx-4'>
        <h2 className='text-lg font-semibold text-gray-900 mb-2'>미션 완료!</h2>
        <div className='mb-6'>
          <p className='text-sm text-gray-600 mb-2'>
            <span className='font-medium'>{mission}</span>을(를) 완료했습니다.
          </p>
          <p className='text-xs text-gray-500 mt-1'>집중한 시간</p>
          <p className='text-2xl font-bold text-primary'>
            {formatTime(elapsedTime)}
          </p>
        </div>
        <button
          type='button'
          onClick={onConfirm}
          className='w-full btn-medium btn-primary'
        >
          확인
        </button>
      </div>
    </div>
  );
}
