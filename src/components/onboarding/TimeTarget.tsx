"use client";

import { memo, useMemo } from "react";
import SelectableButton from "./SelectableButton";

interface TimeTargetProps {
  presetHours: number[];
  selectionType: "preset" | "custom" | null;
  selectedPresetIndex: number | null;
  onSelectPreset: (index: number) => void;
  onSelectCustom: () => void;
  hours: string;
  minutes: string;
  onHoursChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMinutesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TimeTarget({
  presetHours,
  selectionType,
  selectedPresetIndex,
  onSelectPreset,
  onSelectCustom,
  hours,
  minutes,
  onHoursChange,
  onMinutesChange,
}: TimeTargetProps) {
  const isCustom = selectionType === "custom";
  const labels = useMemo(
    () => presetHours.map((h) => `하루 ${h}시간`),
    [presetHours]
  );

  return (
    <div className='max-w-content w-full mx-auto'>
      <div className='flex flex-col gap-3 mt-4'>
        {labels.map((label, idx) => (
          <SelectableButton
            key={label}
            selected={selectionType === "preset" && selectedPresetIndex === idx}
            onClick={() => onSelectPreset(idx)}
          >
            {label}
          </SelectableButton>
        ))}

        {/* 직접 입력 토글 */}
        <SelectableButton
          selected={isCustom}
          onClick={onSelectCustom}
          className={
            !isCustom ? "outline outline-1 outline-gray-200" : undefined
          }
        >
          직접 입력
        </SelectableButton>

        {/* 분리된 입력 박스 */}
        {isCustom && (
          <div className='flex gap-3'>
            <div className='flex-1 h-12 px-5 py-3.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex items-center justify-end gap-1 overflow-hidden'>
              <input
                type='text'
                inputMode='numeric'
                pattern='[0-9]*'
                autoComplete='off'
                value={hours}
                onChange={onHoursChange}
                className='w-[56px] bg-transparent text-right text-base font-medium text-gray-600 outline-none'
              />
              <span className='text-gray-400 text-base font-medium'>시간</span>
            </div>
            <div className='flex-1 h-12 px-5 py-3.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex items-center justify-end gap-1 overflow-hidden'>
              <input
                type='text'
                inputMode='numeric'
                pattern='[0-9]*'
                autoComplete='off'
                value={minutes}
                onChange={onMinutesChange}
                className='w-[56px] bg-transparent text-right text-base font-medium text-gray-600 outline-none'
              />
              <span className='text-gray-400 text-base font-medium'>분</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(TimeTarget);
