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
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`w-full bg-white rounded-t-2xl flex flex-col items-center transform transition-transform duration-300 ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* Modal Handle */}
        <button
          type='button'
          className='w-full h-8 flex justify-center items-center cursor-pointer'
          onClick={onClose}
        >
          <div className='w-12 h-1 bg-neutral-200 rounded-full' />
        </button>

        {/* Content */}
        <div className='w-full px-4 py-4 flex flex-col items-center gap-2'>
          <p className='w-full text-gray-800 text-xs font-medium font-pretendard leading-none tracking-tight'>
            목표 수정
          </p>
          <div className='w-full h-16 flex flex-col justify-start items-end gap-2 mt-2'>
            <div className='self-stretch h-11 relative bg-white border-b-2 border-gray-100 overflow-hidden'>
              <input
                type='text'
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                maxLength={20}
                className='w-full h-full text-gray-900 text-xl font-semibold font-pretendard leading-7 bg-transparent outline-none'
                placeholder='목표를 수정해주세요.'
              />
            </div>
            <p className='self-stretch text-right text-gray-400 text-xs font-normal font-pretendard leading-none tracking-tight'>
              ({goal.length}/20)
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className='w-full p-4 flex justify-center'>
          <button
            type='button'
            className='w-full h-12 bg-indigo-500 rounded-xl text-white text-base font-semibold font-pretendard leading-normal tracking-tight'
            onClick={handleSave}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
