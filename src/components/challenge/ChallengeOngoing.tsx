"use client";

import type { Challenge } from "@/lib/challenge";

interface ChallengeOngoingProps {
  challenge: Challenge;
}

export default function ChallengeOngoing({ challenge }: ChallengeOngoingProps) {
  const formatDate = (dateString: string) => {
    const [y, m, d] = dateString.split("-").map(Number);
    const date = new Date(y, (m ?? 1) - 1, d ?? 1);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(date)
      .replace(/\.\s/g, ".")
      .replace(/\.$/, "");
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  return (
    <div className='flex flex-col h-full bg-white'>
      <div className='bg-blue-500 text-white px-6 py-8'>
        <h1 className='text-2xl font-bold mb-2'>진행 중인 챌린지</h1>
        <p className='text-blue-100'>목표 달성을 위해 화이팅!</p>
      </div>
      <div className='px-6 py-6'>
        <div className='bg-gray-50 rounded-2xl p-6 mb-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>
            {challenge.title}
          </h2>
          <div className='space-y-3'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>챌린지 기간</span>
              <span className='font-medium'>
                {formatDate(challenge.start_date)} ~{" "}
                {formatDate(challenge.end_date)}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>목표 시간</span>
              <span className='font-medium'>
                {formatTime(challenge.goal_time_minutes)}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>챌린지 타입</span>
              <span className='font-medium'>
                {String(challenge.type).toLowerCase() === "personal"
                  ? "개인"
                  : "공유"}
              </span>
            </div>
          </div>
        </div>
        <div className='mb-6'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            참가자 현황
          </h3>
          <div className='space-y-3'>
            {challenge.participants.map((participant) => (
              <div
                key={participant.userId}
                className='bg-white border border-gray-200 rounded-xl p-4'
              >
                <div className='flex items-center justify-between mb-2'>
                  <span className='font-medium text-gray-900'>
                    {participant.nickname}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      participant.status === "달성"
                        ? "bg-green-100 text-green-800"
                        : participant.status === "실패"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {participant.status}
                  </span>
                </div>

                <div className='flex justify-between text-sm text-gray-600'>
                  <span>
                    진행 시간: {formatTime(participant.current_time_minutes)}
                  </span>
                  <span>
                    달성률: {participant.achievement_rate.toFixed(1)}%
                  </span>
                </div>
                <div className='mt-2 bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-blue-500 h-2 rounded-full transition-all duration-300'
                    style={{
                      width: `${Math.min(participant.achievement_rate, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-auto'>
          <button
            type='button'
            className='w-full bg-blue-500 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-blue-600 transition-colors'
          >
            챌린지 상세 보기
          </button>
        </div>
      </div>
    </div>
  );
}
