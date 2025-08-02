"use client";
import { useTabStore } from "@/store/tabStore";

export default function MainTabSwitcher() {
  const { activeTab, setTab } = useTabStore();

  return (
    <div className='flex justify-start items-center gap-3'>
      <button
        type='button'
        onClick={() => setTab("goal")}
        className={`text-heading-2 font-bold ${
          activeTab === "goal" ? "text-gray-900" : "text-gray-400"
        }`}
      >
        목표
      </button>
      <button
        type='button'
        onClick={() => setTab("timer")}
        className={`text-heading-2 font-bold ${
          activeTab === "timer" ? "text-gray-900" : "text-gray-400"
        }`}
      >
        타이머
      </button>
    </div>
  );
}
