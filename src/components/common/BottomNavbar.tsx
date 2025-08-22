"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function BottomNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isHomeActive = pathname === "/main" || pathname === "/timer";
  const isChallengeActive = pathname === "/challenge";
  const isRecordActive = pathname === "/record";

  return (
    <div className='w-full pb-4 sticky bottom-0 bg-white'>
      <div className='max-w-[272px] mx-auto'>
        <div className='w-full px-4 bg-white rounded-[32px] outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-between items-center'>
          <button
            type='button'
            onClick={() => router.push("/challenge")}
            aria-current={isChallengeActive ? "page" : undefined}
            className='h-16 min-w-20 px-4 py-2.5 inline-flex flex-col justify-center items-center gap-0.5'
          >
            <Image
              src={
                isChallengeActive
                  ? "/images/logos/MedalActive.svg"
                  : "/images/logos/Medal.svg"
              }
              alt='challenge'
              width={24}
              height={24}
              priority
            />
            <span
              className={
                isChallengeActive
                  ? "text-primary text-xs font-semibold leading-none tracking-tight"
                  : "text-gray-400 text-xs font-medium leading-none tracking-tight"
              }
            >
              챌린지
            </span>
          </button>
          <button
            type='button'
            onClick={() => router.push("/main")}
            aria-current={isHomeActive ? "page" : undefined}
            className='h-16 min-w-20 px-4 py-2.5 inline-flex flex-col justify-center items-center gap-0.5'
          >
            <Image
              src={
                isHomeActive
                  ? "/images/logos/HomeActive.svg"
                  : "/images/logos/Home.svg"
              }
              alt='home'
              width={24}
              height={24}
              priority
            />
            <span
              className={
                isHomeActive
                  ? "text-primary text-xs font-semibold leading-none tracking-tight"
                  : "text-gray-400 text-xs font-medium leading-none tracking-tight"
              }
            >
              홈
            </span>
          </button>
          <button
            type='button'
            onClick={() => router.push("/record")}
            aria-current={isRecordActive ? "page" : undefined}
            className='h-16 min-w-20 px-4 py-2.5 inline-flex flex-col justify-center items-center gap-0.5'
          >
            <Image
              src={
                isRecordActive
                  ? "/images/logos/RecordActive.svg"
                  : "/images/logos/Record.svg"
              }
              alt='record'
              width={24}
              height={24}
              priority
            />
            <span
              className={
                isRecordActive
                  ? "text-primary text-xs font-semibold leading-none tracking-tight"
                  : "text-gray-400 text-xs font-medium leading-none tracking-tight"
              }
            >
              기록
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
