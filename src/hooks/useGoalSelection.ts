import { useState } from "react";
import { sanitizeNickname as sanitizeGoal } from "@/lib/onboarding";

export type GoalSelectionType = "preset" | "custom" | null;

export function useGoalSelection(presets: string[]) {
  const [selectionType, setSelectionType] = useState<GoalSelectionType>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [customGoal, setCustomGoal] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const selectPreset = (index: number) => {
    setSelectionType("preset");
    setSelectedIndex(index);
  };

  const selectCustom = () => {
    setSelectionType("custom");
    setSelectedIndex(null);
  };

  const handleCustomGoalChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const raw = event.target.value;
    setSelectionType("custom");
    setSelectedIndex(null);
    if (isComposing) {
      setCustomGoal(raw);
      return;
    }
    setCustomGoal(sanitizeGoal(raw));
  };

  const handleCustomCompositionStart = () => {
    setSelectionType("custom");
    setSelectedIndex(null);
    setIsComposing(true);
  };

  const handleCustomCompositionEnd = (
    event: React.CompositionEvent<HTMLInputElement>
  ) => {
    setIsComposing(false);
    const finalized = sanitizeGoal(event.currentTarget.value.normalize("NFC"));
    setCustomGoal(finalized);
  };

  const selectedGoalText =
    selectionType === "preset" && selectedIndex !== null
      ? presets[selectedIndex]
      : selectionType === "custom"
        ? customGoal
        : "";

  const isValid = selectedGoalText.trim().length > 0;

  return {
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
  } as const;
}
