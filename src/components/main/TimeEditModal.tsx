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
            목표 시간 수정
          </h2>
          <p className='text-xs font-medium text-gray-400 leading-none tracking-tight'>
            목표 시간을 설정해주세요.
          </p>
        </div>

        <div className='px-screen-margin pb-6 bg-white flex flex-col items-center gap-4'>
          <div className='w-full h-16 flex justify-start items-start gap-3'>
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
          {error && <p className='text-red-500 text-xs'>{error}</p>}
        </div>

        <div className='px-screen-margin pb-6 bg-white'>
          <button
            type='button'
            onClick={handleSave}
            disabled={isSaveDisabled}
            className={`w-full transition-colors ${
              isSaveDisabled ? "btn-main btn-disabled" : "btn-main btn-primary"
            }`}
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
