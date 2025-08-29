import Image from "next/image";

interface ChallengeFullModalProps {
  onClose: () => void;
}

export default function ChallengeFullModal({
  onClose,
}: ChallengeFullModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 bg-dim-background flex items-center justify-center z-50 p-4'
      onClick={handleBackdropClick}
    >
      <div className='bg-white rounded-2xl p-6 min-w-screen-mobile w-[327px] mx-auto'>
        <div className='flex flex-col justify-start items-center gap-5'>
          <div className='flex flex-col justify-start items-center gap-3'>
            <div className='w-20 h-20 relative bg-white overflow-hidden'>
              <Image
                src='/images/logos/ChallengeFull.svg'
                alt='챌린지 가득참'
                width={80}
                height={80}
                className='w-20 h-20'
                priority
              />
            </div>
            <div className='flex flex-col justify-center items-center gap-1'>
              <div className='text-gray-900 text-xl font-semibold font-["Pretendard"] leading-7'>
                앗! 벌써 6명이 다 모였어요.
              </div>
              <div className='text-center text-gray-400 text-xs font-medium font-["Pretendard"] leading-none tracking-tight'>
                지금은 더 이상 친구를 초대할 수 없어요.
              </div>
            </div>
          </div>
          <div className='w-full'>
            <button
              type='button'
              onClick={onClose}
              className='w-full px-8 py-3 bg-primary rounded-[10px] flex justify-center items-center gap-2.5 overflow-hidden'
            >
              <div className='text-white text-sm font-medium font-["Pretendard"] leading-tight tracking-tight'>
                확인
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
