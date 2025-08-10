import { useState } from "react";

export type TimeSelectionType = "preset" | "custom" | null;

export function useTimeTarget(presetHours: number[]) {
  const [selectionType, setSelectionType] = useState<TimeSelectionType>(null);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number | null>(
    null
  );
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");

  const selectPreset = (index: number) => {
    setSelectionType("preset");
    setSelectedPresetIndex(index);
    setHours("");
    setMinutes("");
  };

  const selectCustom = () => {
    setSelectionType("custom");
    setSelectedPresetIndex(null);
  };

  const sanitizeNumber = (value: string) => value.replace(/[^0-9]/g, "");

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = sanitizeNumber(e.target.value).slice(0, 2);
    setSelectionType("custom");
    setSelectedPresetIndex(null);
    setHours(next);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = sanitizeNumber(e.target.value).slice(0, 2);
    setSelectionType("custom");
    setSelectedPresetIndex(null);
    setMinutes(next);
  };

  const parsedHours = (() => {
    const n = Number(hours);
    if (Number.isNaN(n)) return 0;
    return Math.min(Math.max(n, 0), 24);
  })();

  const parsedMinutes = (() => {
    const n = Number(minutes);
    if (Number.isNaN(n)) return 0;
    return Math.min(Math.max(n, 0), 59);
  })();

  const selectedTotalMinutes =
    selectionType === "preset" && selectedPresetIndex !== null
      ? presetHours[selectedPresetIndex] * 60
      : selectionType === "custom"
        ? parsedHours * 60 + parsedMinutes
        : 0;

  const isValid = selectedTotalMinutes > 0;

  return {
    selectionType,
    selectedPresetIndex,
    selectPreset,
    selectCustom,
    hours,
    minutes,
    handleHoursChange,
    handleMinutesChange,
    parsedHours,
    parsedMinutes,
    selectedTotalMinutes,
    isValid,
  } as const;
}
