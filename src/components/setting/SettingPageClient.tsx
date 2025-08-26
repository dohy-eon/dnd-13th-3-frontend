"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { UserProfileResponse } from "@/types/auth";

interface SettingPageClientProps {
  user: UserProfileResponse | null;
}

export function SettingPageClient({ user }: SettingPageClientProps) {
  const router = useRouter();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  console.log("🔍 SettingPageClient 렌더링:", { user });
  console.log("🔍 사용자 정보 상세:", {
    nickname: user?.nickname,
    characterIndex: user?.characterIndex,
    goal: user?.goal,
    id: user?.id,
  });
  console.log("🔍 characterIndex 상세:", {
    value: user?.characterIndex,
    type: typeof user?.characterIndex,
    characterImage: user?.characterIndex
      ? `/images/logos/Charater${user.characterIndex}.svg`
      : "undefined",
  });

  const handleBack = () => {
    router.back();
  };

  const handleEditProfile = () => {
    router.push("/setting/edit");
  };

  const _handleLogout = () => {
    // TODO: 로그아웃 처리
    console.log("로그아웃");
  };

  const handleNotificationToggle = () => {
    setIsNotificationEnabled(!isNotificationEnabled);
  };

  const getCharacterImage = (characterIndex: number) => {
    return `/images/logos/Charater${characterIndex}.svg`;
  };

  return (
    <div className='h-[100dvh] bg-gray-50'>
      <div className='relative px-4 py-6 flex items-center'>
        <button type='button' onClick={handleBack}>
          <Image
            src='/images/logos/SettingBack.svg'
            alt='뒤로가기'
            width={12}
            height={22}
          />
        </button>
        <h1 className='absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-gray-900'>
          설정
        </h1>
      </div>
      <div className='mt-4 px-4 py-6'>
        <div className='flex flex-col items-center'>
          <div className='relative mb-3'>
            <Image
              src={getCharacterImage(user?.characterIndex || 1)}
              alt='프로필 캐릭터'
              width={80}
              height={80}
              className='rounded-full'
            />
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-lg font-semibold text-gray-900'>
              {user?.nickname}님
            </span>
            <button type='button' onClick={handleEditProfile}>
              <Image
                src='/images/logos/Pencil.svg'
                alt='프로필 수정'
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>
      <div className='mt-4 px-4 py-4'>
        <h2 className='text-base font-medium text-gray-900 mb-3'>알림설정</h2>
        <div className='self-stretch p-4 bg-white rounded-xl inline-flex justify-between items-center w-full'>
          <div className='flex justify-start items-center gap-2'>
            <div className='w-5 h-5 relative'>
              <Image
                src='/images/logos/BellPlus.svg'
                alt='알림'
                width={20}
                height={20}
              />
            </div>
            <div className='justify-start text-gray-600 text-base font-medium leading-normal tracking-tight'>
              알림 설정
            </div>
          </div>
          <button
            type='button'
            onClick={handleNotificationToggle}
            className='w-12 h-7 relative transition-all duration-200 ease-in-out'
          >
            <div
              className={`w-12 h-7 left-0 top-0 absolute rounded-full transition-colors duration-200 ${
                isNotificationEnabled ? "bg-indigo-500" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`w-6 h-6 absolute bg-white rounded-full transition-all duration-200 ${
                isNotificationEnabled
                  ? "left-[3px] top-[2px]"
                  : "left-[27px] top-[2px]"
              }`}
            ></div>
          </button>
        </div>
      </div>
      <div className='mt-4 px-4 py-4'>
        <h2 className='text-base font-medium text-gray-900 mb-3'>이용안내</h2>
        <div className='space-y-3'>
          <div className='self-stretch p-4 bg-white rounded-xl inline-flex justify-between items-center w-full'>
            <div className='flex justify-start items-center gap-2'>
              <div className='w-5 h-5 relative'>
                <Image
                  src='/images/logos/Headset.svg'
                  alt='1:1 문의'
                  width={20}
                  height={20}
                />
              </div>
              <div className='justify-start text-gray-600 text-base font-medium leading-normal tracking-tight'>
                1:1 문의
              </div>
            </div>
          </div>
          <div className='self-stretch p-4 bg-white rounded-xl inline-flex justify-between items-center w-full'>
            <div className='flex justify-start items-center gap-2'>
              <div className='w-5 h-5 relative'>
                <Image
                  src='/images/logos/SignOut.svg'
                  alt='로그아웃'
                  width={20}
                  height={20}
                />
              </div>
              <div className='justify-start text-gray-600 text-base font-medium leading-normal tracking-tight'>
                로그아웃
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
