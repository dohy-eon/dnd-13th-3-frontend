"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { generateInviteUrl } from "@/lib/api/challenge";

export default function ChallengeSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [, setIsLoading] = useState(false);
  const [inviteUrl, setInviteUrl] = useState<string>("");
  const [isLinkGenerated, setIsLinkGenerated] = useState(false);
  const isGeneratingRef = useRef(false);

  const challengeData = {
    challengeId: searchParams.get("challengeId") || "",
    title: searchParams.get("title") || "목표 없음",
    goalTimeHours: parseInt(searchParams.get("goalTime") || "0", 10),
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
  };

  useEffect(() => {
    const generateLink = async () => {
      if (
        !challengeData.challengeId ||
        isLinkGenerated ||
        isGeneratingRef.current
      )
        return;

      isGeneratingRef.current = true;
      setIsLoading(true);
      try {
        const response = await generateInviteUrl(challengeData.challengeId);
        console.log("✅ 초대 링크 생성 성공:", response);

        if (response.success && response.data?.url) {
          setInviteUrl(response.data.url);
          setIsLinkGenerated(true);
        }
      } catch (error) {
        console.error("❌ 초대 링크 생성 실패:", error);
      } finally {
        setIsLoading(false);
        isGeneratingRef.current = false;
      }
    };

    generateLink();
  }, [challengeData.challengeId, isLinkGenerated]);

  const handleCopyLink = async () => {
    if (!inviteUrl) {
      alert("초대 링크가 아직 생성되지 않았습니다.");
      return;
    }

    try {
      await navigator.clipboard.writeText(inviteUrl);
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    } catch (error) {
      console.error("❌ 링크 복사 실패:", error);
      alert("링크 복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleGoBack = () => {
    router.push("/challenge");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  };

  return (
    <div className='flex flex-col h-full bg-white'>
      <div className='flex justify-center pt-32 pb-8'>
        <div className='w-32 h-32 relative'>
          <Image
            src='/images/logos/ChallengeCreate.svg'
            alt='Challenge Create Icon'
            fill
            className='object-contain'
            priority
          />
        </div>
      </div>
      <div className='text-center mb-8 px-5'>
        <h2 className='text-xl font-semibold text-primary mb-2'>
          오늘부터 챌린지 시작!
        </h2>
        <p className='text-sm font-medium text-gray-800 mb-2'>
          챌린지가 완성되었어요! <br /> 이제 친구들을 초대해볼까요?
        </p>
      </div>
      <div className='bg-gray-100 rounded-2xl p-4 mb-8 mx-5'>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <span className='text-sm text-gray-600'>챌린지 기간</span>
            <span className='text-sm font-medium text-gray-900'>
              {formatDate(challengeData.startDate)} ~{" "}
              {formatDate(challengeData.endDate)}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-sm text-gray-600'>목표 시간</span>
            <div className='flex items-center gap-1'>
              <span className='text-sm font-medium text-gray-900'>
                {challengeData.goalTimeHours * 7}시간
              </span>
              <div className="justify-start text-gray-500 text-xs font-medium leading-none tracking-tight">
                · 하루 {challengeData.goalTimeHours}시간
              </div>
            </div>
          </div>
          <div className='flex justify-between'>
            <span className='text-sm text-gray-600'>함께하는 목표</span>
            <span className='text-sm font-medium text-gray-900'>
              {challengeData.title}
            </span>
          </div>
        </div>
      </div>
      <div className='mt-auto px-5 pb-8'>
        <p className='text-sm text-gray-600 text-center mb-3 px-5'>
          친구는 나중에도 초대할 수 있어요!
        </p>
        <div className='flex justify-center gap-3'>
          <button
            type='button'
            onClick={handleGoBack}
            className='flex-1 px-2.5 py-3.5 bg-gray-100 rounded-xl inline-flex justify-center items-center gap-2.5'
          >
            <div className='text-gray-400 text-base font-medium'>
              화면으로 돌아가기
            </div>
          </button>
          <button
            type='button'
            onClick={handleCopyLink}
            className='flex-1 px-2.5 py-3.5 bg-primary rounded-xl inline-flex justify-center items-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <div className='text-white text-base font-semibold'>링크 복사</div>
          </button>
        </div>
      </div>
      {isLinkCopied && (
        <div className='fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50'>
          <div className='w-80 py-3 bg-neutral-900/90 rounded-lg inline-flex justify-center items-center gap-1.5'>
            <Image
              src='/images/logos/CopyLink.svg'
              alt='Copy Link'
              width={24}
              height={24}
              priority
            />
            <div className='text-white text-sm font-medium'>
              링크 복사가 완료되었습니다.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
