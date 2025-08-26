"use client";

import { useMemo, useState } from "react";
import { MainHeader } from "@/components/main";

type Segment = "today" | "week";

export default function RecordPage() {
  const [segment, setSegment] = useState<Segment>("today");

  // Weekly day selection state and mock data
  type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
  const dayMeta: Record<DayKey, { short: string; full: string }> = {
    mon: { short: "월", full: "월요일" },
    tue: { short: "화", full: "화요일" },
    wed: { short: "수", full: "수요일" },
    thu: { short: "목", full: "목요일" },
    fri: { short: "금", full: "금요일" },
    sat: { short: "토", full: "토요일" },
    sun: { short: "일", full: "일요일" },
  };

  const weekdayFromNow = (): DayKey => {
    const idx = new Date().getDay(); // 0=Sun ... 6=Sat
    return ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][idx] as DayKey;
  };

  const [selectedDay, setSelectedDay] = useState<DayKey>(
    weekdayFromNow() === "sun" ? "mon" : (weekdayFromNow() as DayKey)
  );

  const weeklyData: Record<
    DayKey,
    { hours: number; minutes: number; deltaMinutes: number }
  > = {
    mon: { hours: 7, minutes: 10, deltaMinutes: 20 },
    tue: { hours: 6, minutes: 35, deltaMinutes: -15 },
    wed: { hours: 7, minutes: 28, deltaMinutes: 32 },
    thu: { hours: 8, minutes: 2, deltaMinutes: -12 },
    fri: { hours: 5, minutes: 54, deltaMinutes: 45 },
    sat: { hours: 9, minutes: 5, deltaMinutes: -60 },
    sun: { hours: 6, minutes: 12, deltaMinutes: 10 },
  };

  const formatHM = (h: number, m: number) =>
    `${h}시간 ${String(m).padStart(2, "0")}분`;

  const dateLabel = useMemo(() => {
    const now = new Date();
    const formatted = new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    }).format(now);
    return `${formatted}${segment === "today" ? " (오늘)" : ""}`;
  }, [segment]);

  return (
    <>
      {/* Page Header */}
      <MainHeader />

      {/* Scrollable content area (excludes header) */}
      <div className='w-full h-[calc(100dvh-40px)] px-screen-margin bg-white overflow-y-auto flex flex-col'>
        {/* Report Controls */}
        <section className='w-full'>
          <div className='w-full max-w-[1100px] mx-auto mt-4 flex flex-col items-center gap-6 sm:gap-7'>
            <div
              className='w-full bg-gray-200 p-1 rounded-full flex'
              role='tablist'
              aria-label='기간 선택'
            >
              <button
                type='button'
                role='tab'
                aria-selected={segment === "today"}
                aria-controls='panel-today'
                id='tab-today'
                onClick={() => setSegment("today")}
                className={`flex-1 py-2 rounded-full text-body-1 font-medium transition-colors ${
                  segment === "today"
                    ? "bg-white text-gray-900 shadow-sm font-semibold"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                오늘
              </button>
              <button
                type='button'
                role='tab'
                aria-selected={segment === "week"}
                aria-controls='panel-week'
                id='tab-week'
                onClick={() => setSegment("week")}
                className={`flex-1 py-2 rounded-full text-body-1 font-medium transition-colors ${
                  segment === "week"
                    ? "bg-white text-gray-900 shadow-sm font-semibold"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                주간
              </button>
            </div>
            {segment === "today" ? (
              <p className='m-0 text-body-1 font-medium text-gray-700 text-center'>
                {dateLabel}
              </p>
            ) : (
              <div className='w-full flex justify-center'>
                <div className='w-80 inline-flex justify-start items-center'>
                  {/* Mon */}
                  <button
                    type='button'
                    onClick={() => setSelectedDay("mon")}
                    className='flex-1 p-1 inline-flex flex-col justify-start items-center gap-1'
                    aria-pressed={selectedDay === "mon"}
                  >
                    <div
                      className={`w-10 h-10 rounded-full outline outline-2 transition-all ${
                        selectedDay === "mon"
                          ? "bg-indigo-200 outline-indigo-400"
                          : "bg-indigo-100 outline-indigo-100 hover:outline-indigo-200"
                      }`}
                    />
                    <div
                      className={`text-center text-caption-2 font-medium leading-none ${selectedDay === "mon" ? "text-gray-900" : "text-gray-400"}`}
                    >
                      월
                    </div>
                  </button>
                  {/* Tue */}
                  <button
                    type='button'
                    onClick={() => setSelectedDay("tue")}
                    className='flex-1 p-1 inline-flex flex-col justify-start items-center gap-1'
                    aria-pressed={selectedDay === "tue"}
                  >
                    <div
                      className={`w-10 h-10 rounded-full outline outline-2 transition-all ${
                        selectedDay === "tue"
                          ? "bg-rose-300 outline-rose-400"
                          : "bg-rose-200 outline-rose-200 hover:outline-rose-300"
                      }`}
                    />
                    <div
                      className={`text-center text-caption-2 font-medium leading-none ${selectedDay === "tue" ? "text-gray-900" : "text-gray-400"}`}
                    >
                      화
                    </div>
                  </button>
                  {/* Wed */}
                  <button
                    type='button'
                    onClick={() => setSelectedDay("wed")}
                    className='flex-1 p-1 inline-flex flex-col justify-start items-center gap-1'
                    aria-pressed={selectedDay === "wed"}
                  >
                    <div
                      className={`w-10 h-10 rounded-full outline outline-2 transition-all ${
                        selectedDay === "wed"
                          ? "bg-rose-300 outline-rose-400"
                          : "bg-rose-200 outline-rose-200 hover:outline-rose-300"
                      }`}
                    />
                    <div
                      className={`text-center text-caption-2 font-medium leading-none ${selectedDay === "wed" ? "text-gray-900" : "text-gray-400"}`}
                    >
                      수
                    </div>
                  </button>
                  {/* Thu */}
                  <button
                    type='button'
                    onClick={() => setSelectedDay("thu")}
                    className='flex-1 p-1 inline-flex flex-col justify-start items-center gap-1'
                    aria-pressed={selectedDay === "thu"}
                  >
                    <div
                      className={`w-10 h-10 rounded-full outline outline-2 transition-all ${
                        selectedDay === "thu"
                          ? "bg-indigo-200 outline-indigo-400"
                          : "bg-indigo-100 outline-indigo-100 hover:outline-indigo-200"
                      }`}
                    />
                    <div
                      className={`text-center text-caption-2 font-medium leading-none ${selectedDay === "thu" ? "text-gray-900" : "text-gray-400"}`}
                    >
                      목
                    </div>
                  </button>
                  {/* Fri */}
                  <button
                    type='button'
                    onClick={() => setSelectedDay("fri")}
                    className='flex-1 p-1 inline-flex flex-col justify-start items-center gap-1'
                    aria-pressed={selectedDay === "fri"}
                  >
                    <div
                      className={`w-10 h-10 rounded-full outline outline-2 transition-all ${
                        selectedDay === "fri"
                          ? "bg-indigo-200 outline-indigo-400"
                          : "bg-indigo-100 outline-indigo-100 hover:outline-indigo-200"
                      }`}
                    />
                    <div
                      className={`text-center text-caption-2 font-medium leading-none ${selectedDay === "fri" ? "text-gray-900" : "text-gray-400"}`}
                    >
                      금
                    </div>
                  </button>
                  {/* Sat */}
                  <button
                    type='button'
                    onClick={() => setSelectedDay("sat")}
                    className='flex-1 p-1 inline-flex flex-col justify-start items-center gap-1'
                    aria-pressed={selectedDay === "sat"}
                  >
                    <div
                      className={`w-10 h-10 rounded-full outline outline-2 transition-all ${
                        selectedDay === "sat"
                          ? "bg-gray-500 outline-gray-400"
                          : "bg-gray-400 outline-gray-200 hover:outline-gray-300"
                      }`}
                    />
                    <div
                      className={`text-center text-caption-2 font-medium leading-none ${selectedDay === "sat" ? "text-gray-900" : "text-gray-400"}`}
                    >
                      토
                    </div>
                  </button>
                  {/* Sun */}
                  <button
                    type='button'
                    onClick={() => setSelectedDay("sun")}
                    className='flex-1 p-1 inline-flex flex-col justify-start items-center gap-1'
                    aria-pressed={selectedDay === "sun"}
                  >
                    <div
                      className={`w-10 h-10 rounded-full outline outline-2 transition-all ${
                        selectedDay === "sun"
                          ? "bg-gray-500 outline-gray-400"
                          : "bg-gray-400 outline-gray-200 hover:outline-gray-300"
                      }`}
                    />
                    <div
                      className={`text-center text-caption-2 font-medium leading-none ${selectedDay === "sun" ? "text-gray-900" : "text-gray-400"}`}
                    >
                      일
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Details */}
        <section
          className='w-full mt-6'
          role='tabpanel'
          id={segment === "today" ? "panel-today" : "panel-week"}
          aria-labelledby={segment === "today" ? "tab-today" : "tab-week"}
        >
          <div className='w-full max-w-[1100px] mx-auto flex flex-col gap-4 md:gap-6'>
            {segment === "today" ? (
              <>
                {/* Screentime centered */}
                <div className='w-full flex justify-center'>
                  <article className='w-full bg-white rounded-xl p-5 sm:p-6 flex flex-col items-center gap-3 border border-gray-200 shadow-xs'>
                    <div className='w-9 h-9 rounded-md flex items-center justify-center'>
                      <img
                        src='/images/logos/Icon/Normal/Hourglass.svg'
                        alt='모래시계 아이콘'
                      />
                    </div>
                    <div className='text-center'>
                      <p className='m-0 text-label-1 text-gray-600'>
                        오늘의 스크린타임
                      </p>
                      <h2 className='m-0 text-title-2 text-gray-900 font-semibold'>
                        8시간 32분
                      </h2>
                    </div>
                    <div className='bg-gray-100 border border-white rounded-2xl px-3 py-2 inline-flex items-center gap-1 text-caption-1 text-gray-600 font-medium'>
                      <span className='w-0 h-0 border-l-4 border-r-4 border-transparent border-t-5 border-t-primary [border-top-width:5px]' />
                      목표보다{" "}
                      <span className='text-primary font-semibold'>32분</span>{" "}
                      덜 사용했어요!
                    </div>
                  </article>
                </div>

                {/* Insights and App Usage side-by-side */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                  {/* App Usage */}
                  <div className='flex flex-col gap-3 md:order-2'>
                    <h3 className='m-0 text-label-1 text-gray-600 px-1'>
                      앱 별 사용량
                    </h3>
                    <div className='bg-white rounded-xl px-4 py-2 flex flex-col border border-gray-200 shadow-xs'>
                      {/* KakaoTalk */}
                      <div className='flex items-center justify-between py-2'>
                        <div className='flex items-center gap-2 text-label-1 font-medium text-gray-900'>
                          <img
                            src='/images/logos/KakaoTalk.svg'
                            alt='카카오톡 로고'
                            className='w-6 h-6'
                          />
                          <span>카카오톡</span>
                        </div>
                        <span className='text-caption-1 text-gray-500'>
                          1시간 12분
                        </span>
                      </div>
                      {/* Instagram */}
                      <div className='flex items-center justify-between py-2'>
                        <div className='flex items-center gap-2 text-label-1 font-medium text-gray-900'>
                          <img
                            src='/images/logos/insta.svg'
                            alt='인스타그램 로고'
                            className='w-6 h-6'
                          />
                          <span>인스타그램</span>
                        </div>
                        <span className='text-caption-1 text-gray-500'>
                          2시간 05분
                        </span>
                      </div>
                      {/* Chrome */}
                      <div className='flex items-center justify-between py-2'>
                        <div className='flex items-center gap-2 text-label-1 font-medium text-gray-900'>
                          <img
                            src='/images/logos/chrome.svg'
                            alt='크롬 로고'
                            className='w-6 h-6'
                          />
                          <span>크롬</span>
                        </div>
                        <span className='text-caption-1 text-gray-500'>
                          48분
                        </span>
                      </div>
                      {/* YouTube */}
                      <div className='flex items-center justify-between py-2'>
                        <div className='flex items-center gap-2 text-label-1 font-medium text-gray-900'>
                          <img
                            src='/images/logos/youtube.svg'
                            alt='유튜브 로고'
                            className='w-6 h-6'
                          />
                          <span>YouTube</span>
                        </div>
                        <span className='text-caption-1 text-gray-500'>
                          4시간 28분
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Insights */}
                  <div className='flex flex-col gap-3 md:order-1'>
                    <h3 className='m-0 text-label-1 text-gray-600 px-1'>
                      인사이트
                    </h3>
                    <article className='bg-white rounded-xl p-5 flex flex-col gap-6 border border-gray-200 shadow-xs mb-[86px]'>
                      <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-1 text-label-1 text-gray-500'>
                          <img
                            src='/images/logos/Icon/Normal/Graph Next.svg'
                            alt='그래프 아이콘'
                            className='w-6 h-6'
                          />
                          <span>어제와 비교</span>
                        </div>
                        <p className='m-0 text-body-1 font-medium text-gray-900'>
                          목표 달성률 2% 증가
                        </p>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-1 text-label-1 text-gray-500'>
                          <img
                            src='/images/logos/Icon/Normal/Sprout.svg'
                            alt='새싹 아이콘'
                            className='w-6 h-6'
                          />
                          <span>내일 추천 목표</span>
                        </div>
                        <p className='m-0 text-body-1 font-medium text-gray-900'>
                          오늘보다 30분만 더 줄여 볼까요?
                        </p>
                      </div>
                    </article>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Weekly Screentime card (same layout as daily, dynamic by selected day) */}
                <div className='w-full flex justify-center'>
                  <article className='w-full bg-white rounded-xl p-5 sm:p-6 flex flex-col items-center gap-3 border border-gray-200 shadow-xs'>
                    <div className='w-9 h-9 rounded-md flex items-center justify-center'>
                      <img
                        src='/images/logos/Icon/Normal/Hourglass.svg'
                        alt='모래시계 아이콘'
                      />
                    </div>
                    <div className='text-center'>
                      <p className='m-0 text-label-1 text-gray-600'>{`${dayMeta[selectedDay].full}의 스크린타임`}</p>
                      <h2 className='m-0 text-title-2 text-gray-900 font-semibold'>
                        {formatHM(
                          weeklyData[selectedDay].hours,
                          weeklyData[selectedDay].minutes
                        )}
                      </h2>
                    </div>
                    <div className='bg-gray-100 border border-white rounded-2xl px-3 py-2 inline-flex items-center gap-1 text-caption-1 text-gray-600 font-medium'>
                      <span className='w-0 h-0 border-l-4 border-r-4 border-transparent border-t-5 border-t-primary [border-top-width:5px]' />
                      목표보다{" "}
                      <span className='text-primary font-semibold'>
                        {Math.abs(weeklyData[selectedDay].deltaMinutes)}분
                      </span>{" "}
                      {weeklyData[selectedDay].deltaMinutes >= 0 ? "덜" : "더"}{" "}
                      사용했어요!
                    </div>
                  </article>
                </div>

                {/* Weekly: App usage and AI feedback */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                  {/* App Usage (weekly) */}
                  <div className='flex flex-col gap-3 md:order-2'>
                    <h3 className='m-0 text-label-1 text-gray-600 px-1'>
                      앱 별 사용량
                    </h3>
                    <div className='bg-white rounded-xl px-4 py-2 flex flex-col border border-gray-200 shadow-xs'>
                      {/* KakaoTalk */}
                      <div className='flex items-center justify-between py-2'>
                        <div className='flex items-center gap-2 text-label-1 font-medium text-gray-900'>
                          <img
                            src='/images/logos/KakaoTalk.svg'
                            alt='카카오톡 로고'
                            className='w-6 h-6'
                          />
                          <span>카카오톡</span>
                        </div>
                        <span className='text-caption-1 text-gray-500'>
                          1시간 12분
                        </span>
                      </div>
                      {/* Instagram */}
                      <div className='flex items-center justify-between py-2'>
                        <div className='flex items-center gap-2 text-label-1 font-medium text-gray-900'>
                          <img
                            src='/images/logos/insta.svg'
                            alt='인스타그램 로고'
                            className='w-6 h-6'
                          />
                          <span>인스타그램</span>
                        </div>
                        <span className='text-caption-1 text-gray-500'>
                          2시간 05분
                        </span>
                      </div>
                      {/* Chrome */}
                      <div className='flex items-center justify-between py-2'>
                        <div className='flex items-center gap-2 text-label-1 font-medium text-gray-900'>
                          <img
                            src='/images/logos/chrome.svg'
                            alt='크롬 로고'
                            className='w-6 h-6'
                          />
                          <span>크롬</span>
                        </div>
                        <span className='text-caption-1 text-gray-500'>
                          48분
                        </span>
                      </div>
                      {/* YouTube */}
                      <div className='flex items-center justify-between py-2'>
                        <div className='flex items-center gap-2 text-label-1 font-medium text-gray-900'>
                          <img
                            src='/images/logos/youtube.svg'
                            alt='유튜브 로고'
                            className='w-6 h-6'
                          />
                          <span>YouTube</span>
                        </div>
                        <span className='text-caption-1 text-gray-500'>
                          4시간 28분
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI Feedback */}
                  <div className='flex flex-col gap-3 md:order-1'>
                    <div className='flex items-center gap-1 text-label-1 text-gray-600 px-1'>
                      <img
                        src='/images/logos/Icon/Normal/AI.svg'
                        alt='AI 로고'
                        className='w-6 h-6'
                      />
                      <span>AI 피드백</span>
                    </div>
                    <article className='bg-white rounded-xl p-5 flex flex-col gap-3 border border-gray-200 shadow-xs mb-[86px]'>
                      <p className='m-0 text-body-2 text-gray-900 font-pretendard whitespace-pre-line'>
                        📊 오늘 평균 사용 시간 오늘은 총 3시간 20분 동안
                        스마트폰을 사용했어요. 하루 중 오후 10시부터 자정까지
                        집중적으로 사용했어요. 🧾 오늘 사용 요약 그중 절반
                        이상이 SNS와 엔터테인먼트에 쓰였어요. 특히 유튜브와
                        인스타그램 사용 시간이 길었네요. 생산성 앱은 30분 정도로
                        유지됐어요. 💡 추천 행동 오늘은 자기 전 30분만
                        스마트폰을 내려두는 걸 목표로 해볼까요? 눈이 편안해질
                        거예요. 또는 SNS 앱을 하루 한 번만 열어보는 것도 좋은
                        시작이에요.
                      </p>
                    </article>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
