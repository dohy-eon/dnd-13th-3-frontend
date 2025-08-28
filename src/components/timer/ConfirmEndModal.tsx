"use client";

interface ConfirmEndModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmEndModal({
  onConfirm,
  onCancel,
}: ConfirmEndModalProps) {
  return (
    <div className='fixed inset-0 bg-dim-background flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-2xl p-6 min-w-screen-mobile w-[327px] mx-auto'>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>
          정말로 타이머를 끝내시겠습니까?
        </h2>
        <p className='text-xs text-gray-400 mb-6'>
          같이 집중한 시간은 스크린타임에 포함되지 않아요
        </p>
        <div className='flex gap-3'>
          <button
            type='button'
            onClick={onCancel}
            className='flex-1 btn-medium bg-gray-200 text-gray-500'
          >
            이어서 시작
          </button>
          <button
            type='button'
            onClick={onConfirm}
            className='flex-1 btn-medium btn-primary'
          >
            끝내기
          </button>
        </div>
      </div>
    </div>
  );
}
