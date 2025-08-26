"use client";

import Image from "next/image";
import { useState } from "react";
import { GoalTab } from "@/components/common";
import {
  GoalEditModal,
  ProgressSection,
  ScreenTimeInfo,
  StatsCards,
  TimeEditModal,
} from "@/components/main";
import { TabSwitcher } from "@/components/timer";
import { parseScreenTimeValue } from "@/lib/goals";
import type { UserProfileResponse } from "@/types/auth";
import type { ScreenTimeResponse } from "@/types/screentime";

interface MainContentProps {
  userProfile: UserProfileResponse | null;
  screenTimeData: ScreenTimeResponse | null;
}

export default function MainContent({
  userProfile,
  screenTimeData,
}: MainContentProps) {
  const [isTimeEditModalOpen, setIsTimeEditModalOpen] = useState(false);
  const [isGoalEditModalOpen, setIsGoalEditModalOpen] = useState(false);

  const goal =
    userProfile?.goal?.custom ||
    userProfile?.goal?.type ||
    "혼자 있는 시간 디지털 없이 보내기";
  const targetTime = userProfile?.screenTimeGoal?.type
    ? parseScreenTimeValue(userProfile.screenTimeGoal.type)
    : { hours: 7, minutes: 0 };
  const todayScreenTime =
    screenTimeData?.data?.screenTimes?.[0]?.totalMinutes || 0;

  const openTimeEditModal = () => setIsTimeEditModalOpen(true);
  const closeTimeEditModal = () => setIsTimeEditModalOpen(false);

  const openGoalEditModal = () => setIsGoalEditModalOpen(true);
  const closeGoalEditModal = () => setIsGoalEditModalOpen(false);

  const handleSaveTime = (_newHours: string, _newMinutes: string) => {
    // TODO: API 호출로 시간 업데이트
    closeTimeEditModal();
  };

  const handleSaveGoal = (_newGoal: string) => {
    // TODO: API 호출로 목표 업데이트
    closeGoalEditModal();
  };

  const goalScreenTime = targetTime.hours * 60 + targetTime.minutes;
  const isOverTime = goalScreenTime > 0 && todayScreenTime > goalScreenTime;
  const backgroundImageSrc = isOverTime
    ? "/images/logos/screentimeOver.svg"
    : "/images/logos/screentime.svg";

  return (
    <div className='w-full h-[calc(100dvh-40px)] px-screen-margin bg-white overflow-y-auto flex flex-col'>
      {/* 상단 탭 스위처 */}
      <div className='flex pt-[20px]'>
        <TabSwitcher />
      </div>

      {/* 메인 콘텐츠 */}
      <div className='pt-[16px] mb-[100px] flex flex-col relative'>
        <div className='z-20 relative'>
          <GoalTab nickname={userProfile?.nickname || "미누"} />
        </div>

        <div className='flex flex-col items-center justify-center relative mt-5'>
          {/* 배경 이미지 */}
          <div className='w-full min-h-96 relative z-0'>
            <Image
              src={backgroundImageSrc}
              alt='Screen Time Background'
              fill
              className='object-cover'
              priority
            />
          </div>

          {/* 스크린타임 & 진행률 */}
          <div className='absolute z-20 flex-col items-center justify-center w-[303px] h-[335px] overflow-visible left-1/2 transform -translate-x-1/2'>
            <ScreenTimeInfo
              goal={goal}
              openModal={openGoalEditModal}
              todayScreenTime={todayScreenTime}
              nickname={userProfile?.nickname || "미누"}
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

      {/* 모달들 */}
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
