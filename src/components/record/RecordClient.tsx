"use client";

import { useEffect, useMemo, useState } from "react";
import { MainHeader } from "@/components/main";
import { getAIFeedback } from "@/lib/api/aiFeedback";
import type { AIFeedbackResponse } from "@/types/aiFeedback";
import type {
  ScreenTimeResponse,
  ScreenTimeWeekResponse,
} from "@/types/screentime";

type Segment = "today" | "week";

type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface RecordClientProps {
  todayData: ScreenTimeResponse | null;
  weekData: ScreenTimeWeekResponse | null;
  goalMinutes: number;
}

type DayStatus = "OVER" | "UNDER" | "NO_DATA";

interface BaseDayRecord {
  date: string;
  totalMinutes: number;
  status?: DayStatus;
  appTimes?:
    | Array<{ appName: string; minutes: number }>
    | Record<string, number>;
}

interface DayRecord extends Omit<BaseDayRecord, "status"> {
  status: DayStatus;
  appTimes: Record<string, number>;
}

export default function RecordClient({
  todayData,
  weekData,
  goalMinutes,
}: RecordClientProps) {
  const [segment, setSegment] = useState<Segment>("today");
  const [selectedDay, setSelectedDay] = useState<DayKey>("mon");
  const [aiFeedback, setAIFeedback] = useState<
    AIFeedbackResponse["data"] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dayMeta: Record<DayKey, { short: string; full: string }> = {
    mon: { short: "월", full: "월요일" },
    tue: { short: "화", full: "화요일" },
    wed: { short: "수", full: "수요일" },
    thu: { short: "목", full: "목요일" },
    fri: { short: "금", full: "금요일" },
    sat: { short: "토", full: "토요일" },
    sun: { short: "일", full: "일요일" },
  };

  useEffect(() => {
    const weekdayFromNow = (): DayKey => {
      const idx = new Date().getDay();
      const day = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][
        idx
      ] as DayKey;
      return day === "sun" ? "mon" : day;
    };
    setSelectedDay(weekdayFromNow());
  }, []);

  type DayStatus = "OVER" | "UNDER" | "NO_DATA";

  const getDayStatus = (day: DayKey): DayStatus => {
    if (!weekData?.data?.dailyRecords) return "NO_DATA";

    const dayMap: Record<DayKey, number> = {
      sun: 0,
      mon: 1,
      tue: 2,
      wed: 3,
      thu: 4,
      fri: 5,
      sat: 6,
    };

    const dayRecord = weekData.data.dailyRecords.find(
      (r) => new Date(r.date).getDay() === dayMap[day]
    );

    return (dayRecord?.status as DayStatus) || "NO_DATA";
  };

  const getDayIcon = (day: DayKey, isSelected: boolean): string => {
    const status = getDayStatus(day);
    const basePath = "/images/logos";

    if (isSelected) {
      return status === "OVER"
        ? `${basePath}/Red.svg`
        : status === "UNDER"
          ? `${basePath}/Blue.svg`
          : `${basePath}/Default.svg`;
    }

    return status === "OVER"
      ? `${basePath}/Red_BW.svg`
      : status === "UNDER"
        ? `${basePath}/Blue_BW.svg`
        : `${basePath}/Default.svg`;
  };

  const getDayButtonStyle = (
    day: DayKey,
    isSelected: boolean
  ): React.CSSProperties => {
    const status = getDayStatus(day);
    const style: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      height: "40px",
      outline: "2px solid",
      transition: "all 0.3s ease",
    };

    if (isSelected) {
      if (status === "OVER") {
        style.backgroundColor = "#FEE2E2";
        style.outlineColor = "#FCA5A5";
      } else if (status === "UNDER") {
        style.backgroundColor = "#E0E7FF";
        style.outlineColor = "#93C5FD";
      } else {
        style.backgroundColor = "#F3F4F6";
        style.outlineColor = "#9CA3AF";
      }
    } else {
      style.backgroundColor = "#F3F4F6";
      style.outlineColor = "#E5E7EB";
    }

    return style;
  };

  const minutesToHM = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  };

  const formatHM = (h: number, m: number) =>
    `${h}시간 ${String(m).padStart(2, "0")}분`;

  const formatAppTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}분`;
    const h = Math.floor(minutes / 60);
    const min = minutes % 60;
    return min > 0 ? `${h}시간 ${min}분` : `${h}시간`;
  };

  const normalizeAppTimes = (
    record: BaseDayRecord | undefined
  ): Record<string, number> => {
    if (!record?.appTimes) return {};

    if (Array.isArray(record.appTimes)) {
      return record.appTimes.reduce<Record<string, number>>(
        (acc, { appName, minutes }) => {
          acc[appName] = minutes;
          return acc;
        },
        {}
      );
    }

    return { ...record.appTimes };
  };

  const toDayRecord = (record: Partial<BaseDayRecord>): DayRecord => {
    const baseRecord: BaseDayRecord = {
      date: record.date || new Date().toISOString().split("T")[0],
      totalMinutes: record.totalMinutes || 0,
      status: record.status || "NO_DATA",
      appTimes: record.appTimes,
    };

    return {
      ...baseRecord,
      status: baseRecord.status as DayStatus,
      appTimes: normalizeAppTimes(baseRecord),
    };
  };

  // Derived today values
  const todayRecord: DayRecord = useMemo(() => {
    const todayDataRecord = todayData?.data?.screenTimes?.[0];
    if (!todayDataRecord) return toDayRecord({});

    return toDayRecord({
      ...todayDataRecord,
      status: (todayDataRecord as any).status || "NO_DATA",
    });
  }, [todayData]);
  const todayHM = minutesToHM(todayRecord.totalMinutes);
  const todayDelta = goalMinutes - todayRecord.totalMinutes;
  const todayDeltaHM = minutesToHM(Math.abs(todayDelta));

  const availableDays = useMemo(() => {
    const days = new Set<DayKey>();
    weekData?.data?.dailyRecords?.forEach((record) => {
      const day = new Date(record.date).getDay();
      const dayKey = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][
        day
      ] as DayKey;
      days.add(dayKey);
    });
    return days;
  }, [weekData]);

  const selectedDayRecord = useMemo<DayRecord>(() => {
    const recs = weekData?.data?.dailyRecords ?? [];
    const dayMap: Record<DayKey, number> = {
      sun: 0,
      mon: 1,
      tue: 2,
      wed: 3,
      thu: 4,
      fri: 5,
      sat: 6,
    };

    // If selected day has no data, find the first available day
    let currentDay = selectedDay;
    if (!availableDays.has(selectedDay) && availableDays.size > 0) {
      currentDay = Array.from(availableDays)[0] as DayKey;
      setSelectedDay(currentDay);
    }

    const want = dayMap[currentDay];
    const found = recs.find((r) => new Date(r.date).getDay() === want);

    return toDayRecord({
      ...found,
      status: found?.status as DayStatus,
    });
  }, [selectedDay, weekData, availableDays]);

  const selectedHM = minutesToHM(selectedDayRecord.totalMinutes);
  const selectedDelta = goalMinutes - selectedDayRecord.totalMinutes;
  const selectedDeltaHM = minutesToHM(Math.abs(selectedDelta));

  // Fetch AI feedback when segment or selected day changes
  useEffect(() => {
    const fetchAIFeedback = async () => {
      // Skip if we don't have the required data
      const hasRequiredData =
        segment === "today"
          ? !!selectedDayRecord.date
          : !!weekData?.data?.startDate;

      if (!hasRequiredData) {
        console.log("Skipping AI feedback fetch - missing required data", {
          segment,
          hasSelectedDate: !!selectedDayRecord.date,
          hasStartDate: !!weekData?.data?.startDate,
        });
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const isToday = segment === "today";
        const date = isToday
          ? new Date().toISOString().split("T")[0]
          : selectedDayRecord.date;

        console.log("Fetching AI feedback with params:", {
          period: isToday ? "day" : "week",
          date: isToday ? date : undefined,
          startDate: isToday ? undefined : weekData?.data?.startDate,
          type: "screentime",
        });

        const response = await getAIFeedback({
          period: isToday ? "day" : "week",
          date: isToday ? date : undefined,
          startDate: isToday ? undefined : weekData?.data?.startDate,
          type: "screentime",
        });

        console.log("AI feedback response:", response);

        if (!response) {
          throw new Error("No response received from AI feedback API");
        }

        if (response.success && response.data) {
          // Ensure the response data matches our expected structure
          const {
            feedback = "",
            insights = [],
            recommendations = [],
          } = response.data;

          setAIFeedback({
            feedback: feedback,
            insights: Array.isArray(insights) ? insights : [],
            recommendations: Array.isArray(recommendations)
              ? recommendations
              : [],
            period: isToday ? "day" : "week",
            type: "screentime",
            date: isToday ? date : undefined,
            startDate: isToday ? undefined : weekData?.data?.startDate,
          });
        } else {
          const errorMessage = response?.message || "Unknown error occurred";
          console.error("Failed to load AI feedback:", errorMessage);
          setError(`AI 피드백을 불러오는 데 실패했습니다: ${errorMessage}`);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        console.error("Error fetching AI feedback:", errorMessage, err);
        setError(
          `AI 피드백을 불러오는 중 오류가 발생했습니다: ${errorMessage}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAIFeedback().catch((err) => {
      console.error("Unhandled error in fetchAIFeedback:", err);
      setError(`처리되지 않은 오류가 발생했습니다: ${err.message}`);
      setIsLoading(false);
    });
  }, [segment, selectedDay, weekData?.data?.startDate, selectedDayRecord.date]);

  useEffect(() => {
    if (segment === "week") {
      const count = weekData?.data?.dailyRecords?.length ?? 0;
      console.log("[Record] View weekly screentime", {
        totalDays: count,
        goalMinutes,
      });
    }
  }, [segment, weekData, goalMinutes]);

  useEffect(() => {
    if (segment !== "week") return;
    console.log("[Record] Weekly selected day", {
      selectedDay,
      date: selectedDayRecord?.date,
      totalMinutes: selectedDayRecord?.totalMinutes,
      hours: selectedHM.hours,
      minutes: selectedHM.minutes,
    });
  }, [
    segment,
    selectedDay,
    selectedDayRecord?.date,
    selectedDayRecord?.totalMinutes,
    selectedHM.hours,
    selectedHM.minutes,
  ]);

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
      <div className='w-full h-[calc(100dvh-40px)] px-screen-margin bg-white overflow-y-auto flex flex-col font-pretendard'>
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
                  {(
                    [
                      "mon",
                      "tue",
                      "wed",
                      "thu",
                      "fri",
                      "sat",
                      "sun",
                    ] as DayKey[]
                  ).map((day) => {
                    const hasData = availableDays.has(day);
                    const isSelected = selectedDay === day;
                    return (
                      <button
                        key={day}
                        type='button'
                        onClick={() => hasData && setSelectedDay(day)}
                        className={`flex-1 p-1 inline-flex flex-col justify-start items-center gap-1 ${
                          !hasData ? "opacity-30 cursor-not-allowed" : ""
                        }`}
                        aria-pressed={isSelected}
                        disabled={!hasData}
                      >
                        <div
                          className='w-10 h-10 rounded-full outline outline-2 transition-all flex items-center justify-center'
                          style={getDayButtonStyle(day, isSelected)}
                        >
                          <img
                            src={getDayIcon(day, isSelected)}
                            alt={`${dayMeta[day].full} ${hasData ? "" : "(데이터 없음)"}`}
                            className='w-full h-full'
                          />
                        </div>
                        <div
                          className={`text-center text-caption-2 font-medium leading-none ${
                            isSelected ? "text-gray-900" : "text-gray-400"
                          }`}
                        >
                          {dayMeta[day].short}
                        </div>
                      </button>
                    );
                  })}
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
                        {formatHM(todayHM.hours, todayHM.minutes)}
                      </h2>
                    </div>
                    {todayDelta < 0 ? (
                      <div className='px-3 py-2 bg-gray-100 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-100 inline-flex justify-center items-center gap-0.5'>
                        <img
                          src='/images/logos/Icon/Normal/over.svg'
                          alt='초과 아이콘'
                          className='w-3 h-[10px] mt-1'
                        />
                        <div className='text-center justify-start'>
                          <span className='text-gray-500 text-caption-1 font-medium leading-none tracking-tight'>
                            하루 목표 {Math.floor(goalMinutes / 60)}시간보다{" "}
                          </span>
                          <span className='text-rose-500 text-caption-1 font-medium leading-none tracking-tight'>
                            {formatHM(todayDeltaHM.hours, todayDeltaHM.minutes)}
                          </span>
                          <span className='text-gray-500 text-caption-1 font-medium leading-none tracking-tight'>
                            {" "}
                            더 사용했어요!
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className='px-3 py-2 bg-gray-100 rounded-2xl outline outline-1 outline-offset-[-1px] outline-white inline-flex justify-center items-center gap-0.5'>
                        <img
                          src='/images/logos/Icon/Normal/under.svg'
                          alt='미만 아이콘'
                          className='w-3 h-[10px] mt-1'
                        />
                        <div className='text-center justify-start'>
                          <span className='text-gray-500 text-caption-1 font-medium leading-none tracking-tight'>
                            하루 목표 {Math.floor(goalMinutes / 60)}시간보다{" "}
                          </span>
                          <span className='text-indigo-500 text-caption-1 font-medium leading-none tracking-tight'>
                            {formatHM(todayDeltaHM.hours, todayDeltaHM.minutes)}
                          </span>
                          <span className='text-gray-500 text-caption-1 font-medium leading-none tracking-tight'>
                            {" "}
                            덜 사용했어요!
                          </span>
                        </div>
                      </div>
                    )}
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
                          {formatAppTime(todayRecord.appTimes.kakaotalk)}
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
                          {formatAppTime(todayRecord.appTimes.instagram)}
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
                          {formatAppTime(todayRecord.appTimes.chrome)}
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
                          {formatAppTime(todayRecord.appTimes.youtube)}
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
                        {formatHM(selectedHM.hours, selectedHM.minutes)}
                      </h2>
                    </div>
                    {selectedDelta < 0 ? (
                      <div className='px-3 py-2 bg-gray-100 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-100 inline-flex justify-center items-center gap-0.5'>
                        <img
                          src='/images/logos/Icon/Normal/over.svg'
                          alt='초과 아이콘'
                          className='w-3 h-[10px] mt-1'
                        />
                        <div className='text-center justify-start'>
                          <span className='text-gray-500 text-caption-1 font-medium leading-none tracking-tight'>
                            하루 목표 {Math.floor(goalMinutes / 60)}시간보다{" "}
                          </span>
                          <span className='text-rose-500 text-caption-1 font-medium leading-none tracking-tight'>
                            {formatHM(
                              selectedDeltaHM.hours,
                              selectedDeltaHM.minutes
                            )}
                          </span>
                          <span className='text-gray-500 text-caption-1 font-medium leading-none tracking-tight'>
                            {" "}
                            더 사용했어요!
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className='px-3 py-2 bg-gray-100 rounded-2xl outline outline-1 outline-offset-[-1px] outline-white inline-flex justify-center items-center gap-0.5'>
                        <img
                          src='/images/logos/Icon/Normal/under.svg'
                          alt='미만 아이콘'
                          className='w-3 h-[10px] mt-1'
                        />
                        <div className='text-center justify-start'>
                          <span className='text-gray-500 text-caption-1 font-medium leading-none tracking-tight'>
                            하루 목표 {Math.floor(goalMinutes / 60)}시간보다{" "}
                          </span>
                          <span className='text-indigo-500 text-caption-1 font-medium leading-none tracking-tight'>
                            {formatHM(
                              selectedDeltaHM.hours,
                              selectedDeltaHM.minutes
                            )}
                          </span>
                          <span className='text-gray-500 text-caption-1 font-medium leading-none tracking-tight'>
                            {" "}
                            덜 사용했어요!
                          </span>
                        </div>
                      </div>
                    )}
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
                          {formatAppTime(selectedDayRecord.appTimes.kakaotalk)}
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
                          {formatAppTime(selectedDayRecord.appTimes.instagram)}
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
                          {formatAppTime(selectedDayRecord.appTimes.chrome)}
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
                          {formatAppTime(selectedDayRecord.appTimes.youtube)}
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
                      {isLoading ? (
                        <div className='flex justify-center items-center h-32'>
                          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600'></div>
                        </div>
                      ) : error ? (
                        <p className='text-red-500 text-center'>{error}</p>
                      ) : aiFeedback ? (
                        <div className='space-y-4'>
                          <p className='m-0 text-body-2 text-gray-900 whitespace-pre-line'>
                            {aiFeedback.feedback}
                          </p>

                          {aiFeedback.insights.length > 0 && (
                            <div className='mt-4'>
                              <h4 className='font-medium text-gray-700 mb-2'>
                                주요 인사이트
                              </h4>
                              <ul className='space-y-3'>
                                {aiFeedback.insights.map((insight, index) => (
                                  <li
                                    key={index}
                                    className='bg-gray-50 p-3 rounded-lg'
                                  >
                                    <p className='font-medium text-gray-800'>
                                      {insight.title}
                                    </p>
                                    <p className='text-gray-600 mt-1'>
                                      {insight.content}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {aiFeedback.recommendations.length > 0 && (
                            <div className='mt-4'>
                              <h4 className='font-medium text-gray-700 mb-2'>
                                추천 사항
                              </h4>
                              <ul className='space-y-3'>
                                {aiFeedback.recommendations.map(
                                  (rec, index) => (
                                    <li
                                      key={index}
                                      className='bg-indigo-50 p-3 rounded-lg'
                                    >
                                      <p className='font-medium text-indigo-800'>
                                        {rec.title}
                                      </p>
                                      <p className='text-indigo-600 mt-1'>
                                        {rec.content}
                                      </p>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className='text-gray-500 text-center'>
                          AI 피드백을 불러오는 중입니다...
                        </p>
                      )}
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
