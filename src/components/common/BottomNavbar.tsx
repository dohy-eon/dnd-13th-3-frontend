"use client";
import { usePathname, useRouter } from "next/navigation";

export default function BottomNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isHomeActive = pathname === "/" || pathname === "/timer";
  const isChallengeActive = pathname === "/challenge";
  const isRecordActive = pathname === "/record";

  return (
    <div className='h-20 bg-gray-100 border-t border-gray-200'>
      <div className='flex justify-around items-center h-full'>
        <button
          type='button'
          onClick={() => router.push("/challenge")}
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            isChallengeActive ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <div
            className={`w-6 h-6 rounded mb-1 ${
              isChallengeActive ? "bg-blue-600" : "bg-gray-400"
            }`}
          ></div>
          <span className='text-xs'>챌린지</span>
        </button>
        <button
          type='button'
          onClick={() => router.push("/")}
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            isHomeActive ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <div
            className={`w-6 h-6 rounded mb-1 ${
              isHomeActive ? "bg-blue-600" : "bg-gray-400"
            }`}
          ></div>
          <span className='text-xs'>홈</span>
        </button>
        <button
          type='button'
          onClick={() => router.push("/record")}
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            isRecordActive ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <div
            className={`w-6 h-6 rounded mb-1 ${
              isRecordActive ? "bg-blue-600" : "bg-gray-400"
            }`}
          ></div>
          <span className='text-xs'>기록</span>
        </button>
      </div>
    </div>
  );
}
