"use client";

import { memo, useMemo } from "react";
import SelectableButton from "./SelectableButton";

interface GoalSelectProps {
  presets: string[];
  selectionType: "preset" | "custom" | null;
  selectedIndex: number | null;
  customGoal: string;
  onSelectPreset: (index: number) => void;
  onSelectCustom: () => void;
  onChangeCustom: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCompositionStart?: () => void;
  onCompositionEnd?: (e: React.CompositionEvent<HTMLInputElement>) => void;
}

function GoalSelect({
  presets,
  selectionType,
  selectedIndex,
  customGoal,
  onSelectPreset,
  onSelectCustom,
  onChangeCustom,
  onCompositionStart,
  onCompositionEnd,
}: GoalSelectProps) {
  const isCustom = selectionType === "custom";
  const presetKeys = useMemo(
    () => presets.map((p, i) => `${p}-${i}`),
    [presets]
  );

  return (
    <div className='max-w-content w-full mx-auto'>
      <div className='flex flex-col gap-3 mt-4'>
        {presets.map((label, idx) => (
          <SelectableButton
            key={presetKeys[idx]}
            selected={selectionType === "preset" && selectedIndex === idx}
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
          <div className='w-full rounded-xl border border-indigo-500 bg-white'>
            <div className='px-6 py-3.5'>
              <input
                type='text'
                value={customGoal}
                onChange={onChangeCustom}
                onCompositionStart={onCompositionStart}
                onCompositionEnd={onCompositionEnd}
                placeholder='ex. 혼자 있는 시간 디지털 없이 보내보기'
                className='w-full bg-white text-base font-medium text-gray-600 placeholder-gray-400 outline-none'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(GoalSelect);
