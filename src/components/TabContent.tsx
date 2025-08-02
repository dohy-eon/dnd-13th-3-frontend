"use client";
import GoalTab from "@/components/GoalTab";
import TimerTab from "@/components/TimerTab";
import { useTabStore } from "@/store/tabStore";

export default function MainTabContent() {
  const { activeTab } = useTabStore();

  return (
    <div className='max-w-mobile mx-auto w-full h-full'>
      {activeTab === "goal" && <GoalTab />}
      {activeTab === "timer" && <TimerTab />}
    </div>
  );
}
