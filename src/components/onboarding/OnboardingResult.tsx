"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { loadOnboardingData } from "@/lib/onboardingStorage";
import { Container } from ".";

export default function OnboardingResult() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [goal, setGoal] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    setMounted(true);
    const data = loadOnboardingData();
    if (!data) {
      router.replace("/onboarding");
      return;
    }
    setGoal(data.goal);
    setHours(data.hours);
    setMinutes(data.minutes);
  }, [router]);

  const timeLabel = useMemo(() => {
    const parts: string[] = [];
    if (hours > 0) parts.push(`하루 ${hours}시간`);
    if (minutes > 0) parts.push(`${minutes}분`);
    if (parts.length === 0) return "설정된 시간 없음";
    return parts.join(" ");
  }, [hours, minutes]);

  if (!mounted) return null;

  const handleStart = () => {
    router.push("/main");
  };

  return (
    <div className='w-full h-full bg-white relative overflow-hidden pt-10 pb-28'>
      <Container>
        <div className='px-screen-margin text-center pt-[70px] text-gray-900 text-heading-1 font-semibold'>
          준비완료!
          <br />
          목표를 향해 도전을 시작할게요.
        </div>

        <div className='mt-8 flex items-center justify-center'>
          <Image
            src='/images/logos/OnboardingResult.svg'
            alt='Onboarding Result'
            width={287}
            height={157}
            priority
          />
        </div>

        <div className='mt-10 w-full px-screen-margin'>
          <div className='w-full bg-gray-100 rounded-xl py-4 px-4 flex flex-col gap-4'>
            <div className='w-full flex items-start justify-between'>
              <div className='text-gray-400 text-sm font-medium leading-tight tracking-tight'>
                목표
              </div>
              <div className='w-[90%] text-right text-gray-800 text-sm font-medium leading-tight tracking-tight'>
                {goal}
              </div>
            </div>
            <div className='w-full flex items-center justify-between'>
              <div className='text-gray-400 text-sm font-medium leading-tight tracking-tight'>
                목표 시간
              </div>
              <div className='text-gray-800 text-sm font-medium leading-tight tracking-tight'>
                {timeLabel}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div
        className={clsx(
          "fixed bottom-0 left-0 right-0 bg-white z-20 border-t border-gray-100",
          "max-w-tablet mx-auto"
        )}
      >
        <div className='py-3 w-full px-screen-margin'>
          <button
            type='button'
            onClick={handleStart}
            className='w-full py-3.5 rounded-xl font-semibold text-base leading-normal tracking-tight bg-primary text-white hover:shadow-md transition-all duration-200'
          >
            시작하기
          </button>
          <div className='h-8 flex items-center justify-center'>
            <div className='w-32 h-[5px] bg-black rounded-full opacity-80' />
          </div>
        </div>
      </div>
    </div>
  );
}
