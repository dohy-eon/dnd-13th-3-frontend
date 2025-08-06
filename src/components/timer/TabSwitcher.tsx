"use client";
import { usePathname, useRouter } from "next/navigation";

export default function MainTabSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const isGoalActive = pathname === "/main";
  const isTimerActive = pathname === "/timer";

  return (
    <div className='flex justify-start items-center gap-3'>
      <button
        type='button'
        onClick={() => router.push("/main")}
        className={`text-heading-2 font-bold ${
          isGoalActive ? "text-gray-900" : "text-gray-400"
        }`}
      >
        목표
      </button>
      <button
        type='button'
        onClick={() => router.push("/timer")}
        className={`text-heading-2 font-bold ${
          isTimerActive ? "text-gray-900" : "text-gray-400"
        }`}
      >
        타이머
      </button>
    </div>
  );
}
