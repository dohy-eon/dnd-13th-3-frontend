"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { createChallenge } from "@/lib/api/challenge";
import type { CreateChallengeResponse } from "@/lib/challenge";

export default function ChallengeCreateForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [goalTimeHours, setGoalTimeHours] = useState("");

  const { startDate, endDate } = useMemo(() => {
    const today = new Date();
    const start = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    const toYMD = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
        d.getDate()
      ).padStart(2, "0")}`;
    return { startDate: toYMD(start), endDate: toYMD(end) };
  }, []);

  const handleSubmit = async () => {
    const trimmedTitle = title.trim();
    const goalTime = parseInt(goalTimeHours, 10);
    if (
      !trimmedTitle ||
      Number.isNaN(goalTime) ||
      goalTime < 1 ||
      goalTime > 24
    )
      return;

    try {
      const challengeData = {
        title: trimmedTitle,
        start_date: startDate,
        end_date: endDate,
        goal_time_minutes: goalTime * 60,
      };

      console.log("🔍 챌린지 생성 시작:", challengeData);
      const result: CreateChallengeResponse =
        await createChallenge(challengeData);
      console.log("✅ 챌린지 생성 성공:", result);

      const successUrl = `/challenge/success?challengeId=${result.data.challenge_id}&title=${encodeURIComponent(trimmedTitle)}&goalTime=${goalTime}&startDate=${startDate}&endDate=${endDate}`;
      console.log("🚀 성공 페이지로 이동:", successUrl);
      router.push(successUrl);
    } catch (error) {
      console.error("❌ 챌린지 생성 실패:", error);
      alert("챌린지 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const isFormValid =
    title.trim().length > 0 && goalTimeHours && parseInt(goalTimeHours) <= 24;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  };

  return (
    <div className='flex flex-col justify-between h-full'>
      <div className='flex flex-col gap-8 pt-8'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <div className='text-gray-900 text-xl font-semibold leading-7'>
              함께 할 챌린지 목표는?
            </div>
            <div className='text-gray-400 text-sm font-medium leading-tight tracking-tight'>
              목표를 잊지 않도록 상단에 목표가 보여질 거에요.
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='ex.유튜브 하루에 한시간만 하기'
              maxLength={20}
              className='w-full px-4 py-3.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 text-gray-900 text-base font-normal leading-normal tracking-tight focus:outline-primary focus:outline-2'
            />
            <div className='text-right text-gray-400 text-xs font-normal leading-none tracking-tight'>
              ({title.length}/20)
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <div className='text-gray-900 text-xl font-semibold leading-7'>
                목표 시간은 어느 정도가 좋을까요?
              </div>
              <div className='text-gray-400 text-sm font-medium leading-tight tracking-tight'>
                하루 단위로 입력하면, 일주일 목표로 바꿔드려요
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <input
                type='tel'
                inputMode='numeric'
                value={goalTimeHours}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setGoalTimeHours(value);
                }}
                placeholder='3'
                className='w-full px-4 py-3.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 text-gray-900 text-base font-normal leading-normal tracking-tight focus:outline-primary focus:outline-2'
              />
              <div className='text-gray-400 text-xs leading-none tracking-tight'>
                시간 단위로 입력해주세요 (최대 24시간)
              </div>
              <div className='min-h-[20px] flex items-center'>
                {goalTimeHours && parseInt(goalTimeHours) > 24 && (
                  <div className='text-red-500 text-xs leading-none tracking-tight'>
                    하루는 24시간을 초과할 수 없습니다.
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <div className='text-gray-900 text-base font-semibold leading-normal tracking-tight'>
                챌린지는 일주일간 진행돼요.
              </div>
              <div className='text-gray-400 text-sm font-medium leading-tight tracking-tight'>
                오늘부터 7일 뒤 날짜를 자동으로 설정했어요.
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='w-full px-4 py-3.5 bg-gray-100 rounded-xl flex justify-start items-center'>
                <div className='text-gray-800 text-base font-medium leading-normal tracking-tight'>
                  {formatDate(startDate)} ~ {formatDate(endDate)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='pb-8'>
        <div className='flex gap-3'>
          <button
            type='button'
            onClick={handleCancel}
            className='flex-1 px-2.5 py-3.5 bg-gray-100 rounded-xl flex justify-center items-center hover:bg-gray-200 transition-colors'
          >
            <div className='text-gray-400 text-base font-semibold leading-normal tracking-tight'>
              취소
            </div>
          </button>
          <button
            type='button'
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`flex-1 px-2.5 py-3.5 rounded-xl flex justify-center items-center transition-colors ${
              isFormValid ? "btn-main btn-primary" : "btn-main btn-disabled"
            }`}
          >
            <div className='text-base font-semibold leading-normal tracking-tight'>
              챌린지 시작
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
