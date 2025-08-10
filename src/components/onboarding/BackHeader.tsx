"use client";

import { ChevronLeft } from "lucide-react";
import { memo } from "react";

interface BackHeaderProps {
  onBack: () => void;
}

function BackHeader({ onBack }: BackHeaderProps) {
  return (
    <div className='absolute top-0 left-0 right-0 bg-white z-10'>
      <div className='w-full px-screen-margin'>
        <div className='w-full max-w-content mx-auto h-12 flex items-center'>
          <button
            type='button'
            onClick={onBack}
            className='mt-0 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200'
            aria-label='뒤로가기'
          >
            <ChevronLeft className='text-gray-900' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(BackHeader);
