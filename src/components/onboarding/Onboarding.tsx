"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useGoalSelection } from "@/hooks/useGoalSelection";
import { useNicknameInput } from "@/hooks/useNicknameInput";
import { useTimeTarget } from "@/hooks/useTimeTarget";
import { getOnboardingTitle, TOTAL_STEPS } from "@/lib/onboarding";
import {
  BackHeader,
  BottomBar,
  Container,
  GoalSelect,
  NicknameField,
  StepProgress,
  TimeTarget,
  TitleSection,
} from ".";

export default function Onboarding() {
  const router = useRouter();
  const {
    nickname,
    handleChange,
    handleCompositionStart,
    handleCompositionEnd,
  } = useNicknameInput("");
  const [currentStep, setCurrentStep] = useState(1);

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
    isValid: isGoalValid,
  } = useGoalSelection(presets);

  const presetHours = useMemo(() => [2, 4, 6, 8], []);
  const {
    selectionType: timeSelectionType,
    selectedPresetIndex,
    selectPreset: selectTimePreset,
    selectCustom: selectTimeCustom,
    hours,
    minutes,
    handleHoursChange,
    handleMinutesChange,
    isValid: isTimeValid,
  } = useTimeTarget(presetHours);

  const handleBack = useCallback(() => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
    else router.push("/login");
  }, [currentStep, router]);

  const handleNextClick = useCallback(() => {
    if (currentStep < TOTAL_STEPS) setCurrentStep((s) => s + 1);
    else router.push("/main");
  }, [currentStep, router]);

  const isStep1Valid = nickname.trim().length > 0;
  const isStep2Valid = isGoalValid;
  const isStep3Valid = isTimeValid;
  const isNextButtonDisabled =
    currentStep === 1
      ? !isStep1Valid
      : currentStep === 2
        ? !isStep2Valid
        : !isStep3Valid;

  const title = getOnboardingTitle(currentStep);

  return (
    <div className='w-full h-full bg-white relative overflow-hidden pt-12 pb-24'>
      <BackHeader onBack={handleBack} />
      <StepProgress currentStep={currentStep} />

      <Container>
        <TitleSection
          title={title}
          subtitle={
            currentStep === 2
              ? "목표 도달까지 미누가 함께해요"
              : currentStep === 3
                ? "스크린 타임은 줄일수록 건강해져요"
                : undefined
          }
          subtitleClassName={
            currentStep === 2
              ? "text-label-1 font-medium text-gray-400 tracking-tight mb-6"
              : undefined
          }
          compact={currentStep === 2 || currentStep === 3}
        />

        {currentStep === 1 && (
          <NicknameField
            value={nickname}
            onChange={handleChange}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
          />
        )}

        {currentStep === 2 && (
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
        )}

        {currentStep === 3 && (
          <TimeTarget
            presetHours={presetHours}
            selectionType={timeSelectionType}
            selectedPresetIndex={selectedPresetIndex}
            onSelectPreset={selectTimePreset}
            onSelectCustom={selectTimeCustom}
            hours={hours}
            minutes={minutes}
            onHoursChange={handleHoursChange}
            onMinutesChange={handleMinutesChange}
          />
        )}
      </Container>

      <BottomBar
        disabled={isNextButtonDisabled}
        onNext={handleNextClick}
        label={currentStep === TOTAL_STEPS ? "완료" : "다음"}
      />
    </div>
  );
}
