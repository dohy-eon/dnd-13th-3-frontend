"use client";

import { useEffect, useState } from "react";

interface GoalEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: string) => void;
  initialGoal: string;
}

export default function GoalEditModal({
  isOpen,
  onClose,
  onSave,
  initialGoal,
}: GoalEditModalProps) {
  const [goal, setGoal] = useState(initialGoal);

  useEffect(() => {
    if (isOpen) {
      setGoal(initialGoal);
    }
  }, [isOpen, initialGoal]);

  const handleSave = () => {
    onSave(goal);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-dim-background flex items-end z-[99999]'
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      role='dialog'
      aria-modal='true'
    >
      <div
        className='bg-white w-full min-w-mobile max-w-tablet mx-auto rounded-t-[39px] max-h-[70vh] overflow-y-auto animate-slide-up'
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role='document'
      >
        <div className='h-4 px-2.5 bg-white rounded-t-[39px] rounded-tr-[34px] flex flex-col justify-end items-center'>
          <div className='w-12 h-1 bg-neutral-200 rounded-[40px]'></div>
        </div>

        <div className='px-screen-margin py-[20px] bg-white'>
          <h2 className='text-xl font-semibold text-gray-900 mb-1'>
            목표 수정
          </h2>
          <p className='text-xs font-medium text-gray-400 leading-none tracking-tight'>
            목표를 수정해주세요.
          </p>
        </div>

        <div className='px-screen-margin pb-6 bg-white flex flex-col items-center gap-4'>
          <div className='w-full flex flex-col justify-start items-end gap-2'>
            <div className='w-full h-11 relative bg-white border-b-2 border-gray-100 overflow-hidden'>
              <input
                type='text'
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                maxLength={20}
                className='w-full h-full text-gray-900 text-xl font-semibold leading-7 bg-transparent outline-none'
                placeholder='목표를 수정해주세요.'
              />
            </div>
            <p className='text-right text-gray-400 text-xs font-normal leading-none tracking-tight'>
              ({goal.length}/20)
            </p>
          </div>
        </div>

        <div className='px-screen-margin pb-6 bg-white'>
          <button
            type='button'
            className='w-full transition-colors btn-main btn-primary'
            onClick={handleSave}
          >
            완료
          </button>
        </div>

        <div className='h-8 relative backdrop-blur-lg'>
          <div className='w-32 h-[5px] left-1/2 top-[21px] absolute bg-neutral-900 rounded-md transform -translate-x-1/2'></div>
        </div>
      </div>
    </div>
  );
}
