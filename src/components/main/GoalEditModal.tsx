"use client";

import { useEffect, useMemo } from "react";
import GoalSelect from "@/components/onboarding/GoalSelect";
import { useGoalSelection } from "@/hooks/useGoalSelection";

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
  const presets = useMemo(
    () => [
      "규칙적인 수면 습관을 만들고 싶어요",
      "집중력을 높이고 산만함을 줄이고 싶어요",
      "눈 건강을 지키고 싶어요",
      "혼자 있는 시간 디지털 없이 보내보기",
    ],
    []
  );

  const {
    selectionType,
    selectedIndex,
    customGoal,
    selectPreset,
    selectCustom,
    handleCustomGoalChange,
    handleCustomCompositionStart,
    handleCustomCompositionEnd,
    selectedGoalText,
    isValid,
  } = useGoalSelection(presets);

  // 초기 진입 시 현재 목표에 맞춰 선택 상태 세팅
  useEffect(() => {
    if (!isOpen) return;
    const presetIdx = presets.findIndex((p) => p === initialGoal);
    if (presetIdx >= 0) {
      selectPreset(presetIdx);
    } else {
      selectCustom();
      // 직접 입력 값 세팅 (조합 입력 상태 고려 없이 바로 값 반영)
      handleCustomGoalChange({
        target: { value: initialGoal },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  }, [isOpen, initialGoal, presets]);

  const handleSave = () => {
    if (!isValid) return onClose();
    onSave(selectedGoalText);
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
          <GoalSelect
            presets={presets}
            selectionType={selectionType}
            selectedIndex={selectedIndex}
            customGoal={customGoal}
            onSelectPreset={selectPreset}
            onSelectCustom={selectCustom}
            onChangeCustom={handleCustomGoalChange}
            onCompositionStart={handleCustomCompositionStart}
            onCompositionEnd={handleCustomCompositionEnd}
          />
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
