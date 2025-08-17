"use client";

import { useEffect, useState } from "react";
import TimeInput from "@/components/main/TimeInput";

interface TimeEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (hours: string, minutes: string) => void;
  initialHours: number;
  initialMinutes: number;
}

export default function TimeEditModal({
  isOpen,
  onClose,
  onSave,
  initialHours,
  initialMinutes,
}: TimeEditModalProps) {
  const [hours, setHours] = useState(String(initialHours));
  const [minutes, setMinutes] = useState(String(initialMinutes));
  const [error, setError] = useState<string | null>(null);

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setError(null);
    if (value === "") {
      setHours("");
      return;
    }
    const n = Number.parseInt(value, 10);
    if (Number.isNaN(n) || n < 0 || n > 23) {
      setError("시간은 0에서 23 사이로 입력해주세요.");
      return;
    }
    setHours(String(n));
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setError(null);
    if (value === "") {
      setMinutes("");
      return;
    }
    const n = Number.parseInt(value, 10);
    if (Number.isNaN(n) || n < 0 || n > 59) {
      setError("분은 0에서 59 사이로 입력해주세요.");
      return;
    }
    setMinutes(String(n));
  };

  useEffect(() => {
    if (isOpen) {
      setHours(String(initialHours));
      setMinutes(String(initialMinutes));
      setError(null);
    }
  }, [isOpen, initialHours, initialMinutes]);

  const handleSave = () => {
    if (error || hours === "" || minutes === "") return;
    onSave(hours, minutes);
    onClose();
  };

  const isSaveDisabled = error !== null || hours === "" || minutes === "";
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50'>
      <div className='w-96 bg-white rounded-t-2xl flex flex-col items-center'>
        {/* 모달 */}
        <button
          type='button'
          className='w-full h-8 flex justify-center items-center cursor-pointer'
          onClick={onClose}
        >
          <div className='w-12 h-1 bg-neutral-200 rounded-full' />
        </button>

        {/* 내용 */}
        <div className='w-80 py-4 flex flex-col items-center gap-2'>
          <p className='w-full text-gray-800 text-xs font-medium font-pretendard leading-none tracking-tight'>
            목표 시간 수정
          </p>
          <div className='w-full h-16 flex justify-start items-start gap-3 mt-2'>
            <TimeInput
              value={hours}
              onChange={handleHoursChange}
              label='시간'
            />
            <TimeInput
              value={minutes}
              onChange={handleMinutesChange}
              label='분'
            />
          </div>
          {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
        </div>

        {/* 완료버튼 */}
        <div className='w-full p-2.5 flex justify-center'>
          <button
            type='button'
            className={`w-80 h-12 rounded-xl text-white text-base font-semibold font-pretendard leading-normal tracking-tight ${
              isSaveDisabled ? "bg-gray-300" : "bg-indigo-500"
            }`}
            onClick={handleSave}
            disabled={isSaveDisabled}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
