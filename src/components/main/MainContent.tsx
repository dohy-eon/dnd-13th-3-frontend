"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { GoalTab } from "@/components/common";
import {
  GoalEditModal,
  ProgressSection,
  ScreenTimeInfo,
  StatsCards,
  TimeEditModal,
} from "@/components/main";
import { TabSwitcher } from "@/components/timer";
import { loadOnboardingData } from "@/lib/onboardingStorage";

export default function MainContent() {
  const [isTimeEditModalOpen, setTimeEditModalOpen] = useState(false);
  const [isGoalEditModalOpen, setGoalEditModalOpen] = useState(false);
  const [goal, setGoal] = useState("혼자 있는 시간 디지털 없이 보내기");
  const [targetTime, setTargetTime] = useState({ hours: 7, minutes: 0 });
  const [todayScreenTime, _setTodayScreenTime] = useState(210); // 더미데이터 (3시간 30분)

  useEffect(() => {
    const data = loadOnboardingData();
    if (!data) return;
    if (data.goal) setGoal(data.goal);
    setTargetTime({ hours: data.hours ?? 0, minutes: data.minutes ?? 0 });
  }, []);

  const openTimeEditModal = () => setTimeEditModalOpen(true);
  const closeTimeEditModal = () => setTimeEditModalOpen(false);

  const openGoalEditModal = () => setGoalEditModalOpen(true);
  const closeGoalEditModal = () => setGoalEditModalOpen(false);

  const handleSaveTime = (newHours: string, newMinutes: string) => {
    setTargetTime({
      hours: parseInt(newHours, 10) || 0,
      minutes: parseInt(newMinutes, 10) || 0,
    });
    closeTimeEditModal();
  };

  const handleSaveGoal = (newGoal: string) => {
    setGoal(newGoal);
    closeGoalEditModal();
  };

  const goalScreenTime = useMemo(
    () => targetTime.hours * 60 + targetTime.minutes,
    [targetTime]
  );
  const isOverTime = useMemo(
    () => goalScreenTime > 0 && todayScreenTime > goalScreenTime,
    [goalScreenTime, todayScreenTime]
  );
  const backgroundImageSrc = isOverTime
    ? "/images/logos/screentimeOver.svg"
    : "/images/logos/screentime.svg";

  return (
    <div className='w-full h-[calc(100dvh-120px)] px-screen-margin bg-white overflow-hidden flex flex-col'>
      {/* 상단 탭 스위처 */}
      <div className='flex pt-[20px]'>
        <TabSwitcher />
      </div>

      {/* 메인 콘텐츠 */}
      <div className='pt-[16px] flex flex-col relative'>
        <div className='z-20 relative'>
          <GoalTab />
        </div>

        <div className='flex flex-col items-center justify-center relative mt-5'>
          {/* 배경 이미지 */}
          <div className='justify-center items-center z-0'>
            <Image
              src={backgroundImageSrc}
              alt='Screen Time Background'
              width={335}
              height={335}
            />
          </div>

          {/* 스크린타임 & 진행률 */}
          <div className='absolute z-20 flex-col items-center justify-center w-[303px] h-[335px] overflow-visible left-1/2 transform -translate-x-1/2'>
            <ScreenTimeInfo
              goal={goal}
              openModal={openGoalEditModal}
              todayScreenTime={todayScreenTime}
            />
            <ProgressSection
              todayScreenTime={todayScreenTime}
              goalScreenTime={targetTime.hours * 60 + targetTime.minutes}
            />
          </div>
        </div>

        {/* 통계 카드 */}
        <div className='flex justify-center mt-3'>
          <StatsCards
            targetTime={targetTime}
            openModal={openTimeEditModal}
            isOverTime={isOverTime}
            todayScreenTime={todayScreenTime}
            goalScreenTime={goalScreenTime}
          />
        </div>
      </div>
      <TimeEditModal
        isOpen={isTimeEditModalOpen}
        onClose={closeTimeEditModal}
        onSave={handleSaveTime}
        initialHours={targetTime.hours}
        initialMinutes={targetTime.minutes}
      />
      <GoalEditModal
        isOpen={isGoalEditModalOpen}
        onClose={closeGoalEditModal}
        onSave={handleSaveGoal}
        initialGoal={goal}
      />
    </div>
  );
}
