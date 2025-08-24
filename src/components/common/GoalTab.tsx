"use client";

import { useMemo } from "react";
import { useUserStore } from "@/stores/userStore";

export default function GoalTab() {
  const { user, onboardingData } = useUserStore();
  const nickname = useMemo(() => {
    const n = user?.nickname || onboardingData?.nickname || "미누";
    // 닉네임 뒤에 존칭 '님' 붙이기 (이미 '님'이 있으면 중복 방지)
    return n.endsWith("님") ? n : `${n}님`;
  }, [user, onboardingData]);

  return (
    <div className='w-full flex flex-col'>
      <div className='max-w-content flex flex-col'>
        <div className='text-heading-1 text-gray-900 font-pretendard'>
          <span className='font-bold'>{nickname},</span>
          <span className='font-medium'> 잘하고 있어요!</span>
        </div>
        <span className='text-heading-1 font-medium text-gray-900 font-pretendard'>
          오늘도 멋지게 해내고 있어요!
        </span>
      </div>
    </div>
  );
}
