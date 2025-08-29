"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { updateUserProfile } from "@/lib/api/user";
import {
  mapGoalEnumToLabel,
  mapGoalPresetToEnum,
  parseScreenTimeValue,
} from "@/lib/goals";
import type {
  ProfileRegistrationRequest,
  UserProfileResponse,
} from "@/types/auth";
import type { ScreenTimeResponse } from "@/types/screentime";

type UpdateProfileBody = Omit<
  ProfileRegistrationRequest,
  "nickname" | "goal" | "screenTimeGoal"
> & {
  nickname: string;
  goal?: {
    type: string;
    custom: string | null;
  };
  screenTimeGoal?: {
    type: string;
    custom: string | null;
  };
  characterIndex?: number;
};

interface MainContentProps {
  userProfile: UserProfileResponse | null;
  screenTimeData: ScreenTimeResponse | null;
}

export default function MainContent({
  userProfile,
  screenTimeData,
}: MainContentProps) {
  const router = useRouter();
  const [isTimeEditModalOpen, setIsTimeEditModalOpen] = useState(false);
  const [isGoalEditModalOpen, setIsGoalEditModalOpen] = useState(false);

  const goal =
    userProfile?.goal?.custom ??
    mapGoalEnumToLabel(userProfile?.goal?.type, userProfile?.goal?.custom) ??
    "혼자 있는 시간 디지털 없이 보내기";

  // 항상 userProfile에서 직접 targetTime을 계산
  const targetTime = userProfile?.screenTimeGoal
    ? parseScreenTimeValue(userProfile.screenTimeGoal)
    : { hours: 7, minutes: 0 };
  const todayScreenTime =
    screenTimeData?.data?.screenTimes?.[0]?.totalMinutes || 0;

  const openTimeEditModal = () => setIsTimeEditModalOpen(true);
  const closeTimeEditModal = () => setIsTimeEditModalOpen(false);

  const openGoalEditModal = () => setIsGoalEditModalOpen(true);
  const closeGoalEditModal = () => setIsGoalEditModalOpen(false);

  // Helpers to build current payload parts from existing profile
  const buildCurrentGoalBody = () => {
    const t = userProfile?.goal?.type; // enum string like FOCUS_IMPROVEMENT or CUSTOM
    const c = userProfile?.goal?.custom ?? null;
    if (!t) return undefined;
    if (t === "CUSTOM") {
      return { goal: { type: "CUSTOM", custom: c } } as const;
    }
    return { goal: { type: t, custom: null } } as const;
  };

  const buildCurrentScreenTimeBody = () => {
    const screenTimeGoal = userProfile?.screenTimeGoal;
    if (!screenTimeGoal?.type) return undefined;

    const { type, custom } = screenTimeGoal;
    // If numeric-like, treat as preset minutes; else custom
    const isNumber = /^\d+$/.test(type);
    if (isNumber) return { screenTimeGoal: { type, custom: null } };
    return { screenTimeGoal: { type: "CUSTOM", custom: custom ?? null } };
  };

  const buildIdentityBody = () => {
    const nickname = userProfile?.nickname ?? "";
    const characterIndex = userProfile?.characterIndex ?? 0;
    return { nickname, characterIndex } as const;
  };

  const handleSaveTime = async (_newHours: string, _newMinutes: string) => {
    try {
      const h = parseInt(_newHours || "0", 10);
      const m = parseInt(_newMinutes || "0", 10);
      const totalMinutes = h * 60 + m;

      const screenTimePart = {
        screenTimeGoal: {
          type: "custom",
          custom: totalMinutes.toString(),
        },
      };

      const goalPart = buildCurrentGoalBody();
      const identityPart = buildIdentityBody();
      const body: UpdateProfileBody = {
        ...identityPart,
        ...goalPart,
        ...screenTimePart,
      };

      // Update server and refresh data
      await updateUserProfile(body);
      closeTimeEditModal();

      // Trigger a refresh of the page data
      window.location.reload();
    } catch (e) {
      console.error("목표 시간 업데이트 실패", e);
    }
  };

  const handleSaveGoal = async (_newGoal: string) => {
    try {
      // If matches one of preset labels, use that label as type; else custom
      const mapped = mapGoalPresetToEnum(_newGoal);
      const isPreset =
        mapped !== undefined && mapped !== null && mapped !== "custom";
      const goalPart = isPreset
        ? { goal: { type: mapped, custom: null } }
        : { goal: { type: "custom", custom: _newGoal } };
      const screenTimePart = buildCurrentScreenTimeBody();
      const identityPart = buildIdentityBody();
      const body = { ...identityPart, ...goalPart, ...screenTimePart };

      await updateUserProfile(body);
      closeGoalEditModal();
      router.refresh();
    } catch (e) {
      console.error("목표 업데이트 실패", e);
    }
  };

  const goalScreenTime = targetTime.hours * 60 + targetTime.minutes;
  const isOverTime = goalScreenTime > 0 && todayScreenTime > goalScreenTime;
  const backgroundImageSrc = isOverTime
    ? "/images/logos/screentimeOver.svg"
    : "/images/logos/screentime.svg";

  // Temporary debug logs
  const nicknameProp = userProfile?.nickname ?? "미누";
  if (nicknameProp === "미누") {
    console.warn(
      "[MainContent] Nickname fallback used. userProfile?.nickname:",
      userProfile?.nickname
    );
  }
  console.log("[MainContent] userProfile:", userProfile);
  console.log("[MainContent] derived:", {
    nickname: userProfile?.nickname,
    goal,
    targetTime,
    todayScreenTime,
  });

  return (
    <div className='w-full h-[calc(100dvh-40px)] px-screen-margin bg-white overflow-y-auto flex flex-col'>
      {/* 상단 탭 스위처 */}
      <div className='flex pt-[20px]'>
        <TabSwitcher />
      </div>

      {/* 메인 콘텐츠 */}
      <div className='pt-[16px] mb-[100px] flex flex-col relative'>
        <div className='z-20 relative'>
          <GoalTab nickname={nicknameProp} />
        </div>

        <div className='flex flex-col items-center justify-center relative mt-5'>
          {/* 배경 이미지 */}
          <div className='w-full min-h-96 relative z-0 rounded-[16px] overflow-hidden'>
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
            />
            <ProgressSection
              todayScreenTime={todayScreenTime}
              goalScreenTime={targetTime.hours * 60 + targetTime.minutes}
              characterIndex={userProfile?.characterIndex}
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
