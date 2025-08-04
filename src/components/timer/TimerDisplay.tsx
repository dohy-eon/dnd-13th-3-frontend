"use client";
import { useMemo } from "react";
import CircularTimer from "./CircularTimer";
import MissionSelectButton from "./MissionSelectButton";
import TimeDisplay from "./TimeDisplay";

interface TimerDisplayProps {
  elapsedTime: number;
  selectedMission: string;
  onSelectMission: () => void;
  isModalOpen: boolean;
}

export default function TimerDisplay({
  elapsedTime,
  selectedMission,
  onSelectMission,
  isModalOpen,
}: TimerDisplayProps) {
  const { progressPercentage } = useMemo(() => {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const progressPercentage = Math.min(
      ((totalSeconds % 3600) / 3600) * 100,
      100
    );

    return { progressPercentage };
  }, [elapsedTime]);

  return (
    <div className='flex flex-col items-center justify-center flex-1 px-4'>
      <MissionSelectButton
        selectedMission={selectedMission}
        isModalOpen={isModalOpen}
        onClick={onSelectMission}
      />

      <div className='relative flex items-center justify-center'>
        <CircularTimer
          elapsedTime={elapsedTime}
          progressPercentage={progressPercentage}
        />
        <TimeDisplay elapsedTime={elapsedTime} />
      </div>
    </div>
  );
}
