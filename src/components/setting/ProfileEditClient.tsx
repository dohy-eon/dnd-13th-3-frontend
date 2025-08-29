"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateUserProfile } from "@/lib/api/user";
import type { UserProfileResponse } from "@/types/auth";

interface ProfileEditClientProps {
  user: UserProfileResponse | null;
}

export function ProfileEditClient({ user }: ProfileEditClientProps) {
  const router = useRouter();
  const [selectedCharacter, setSelectedCharacter] = useState(
    user?.characterIndex || 1
  );
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [goal, setGoal] = useState(
    user?.goal?.custom ||
      user?.goal?.type ||
      "혼자 있는 시간 디지털 없이 보내보기"
  );
  const [hours, setHours] = useState("7");
  const [minutes, setMinutes] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // screenTimeGoal 초기값 설정
  useEffect(() => {
    if (user?.screenTimeGoal?.custom) {
      const totalMinutes = parseInt(user.screenTimeGoal.custom, 10);
      if (!Number.isNaN(totalMinutes)) {
        setHours(Math.floor(totalMinutes / 60).toString());
        setMinutes((totalMinutes % 60).toString());
      }
    }
  }, [user?.screenTimeGoal?.custom]);

  const handleBack = () => {
    router.back();
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d{0,2}$/.test(value)) {
      setHours(value);
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d{0,2}$/.test(value)) {
      if (parseInt(value, 10) < 60) {
        setMinutes(value);
      }
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const isGoalChanged = goal !== (user?.goal?.custom || user?.goal?.type);
      const totalMinutes =
        parseInt(hours || "0", 10) * 60 + parseInt(minutes || "0", 10);
      const isScreenTimeChanged =
        totalMinutes !== parseInt(user?.screenTimeGoal?.custom || "420", 10);

      const profileData = {
        nickname,
        characterIndex: selectedCharacter,
        goal: {
          type: isGoalChanged ? "CUSTOM" : user?.goal?.type || "NO_SCREEN",
          custom: isGoalChanged ? goal : user?.goal?.custom || null,
        },
        screenTimeGoal: {
          type: isScreenTimeChanged
            ? "CUSTOM"
            : user?.screenTimeGoal?.type || "420",
          custom: isScreenTimeChanged
            ? totalMinutes.toString()
            : user?.screenTimeGoal?.custom || "420",
        },
      };

      const response = await updateUserProfile(profileData);
      console.log("프로필 저장 성공:", response);
      setShowSuccessToast(true);

      setTimeout(() => {
        router.back();
      }, 1000);
    } catch (error) {
      console.error("프로필 저장 실패:", error);
      alert("프로필 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const getCharacterImage = (characterIndex: number) => {
    return `/images/logos/Charater${characterIndex}.svg`;
  };

  if (!user) {
    return null;
  }

  return (
    <div className='h-[100dvh] bg-gray-50 flex flex-col'>
      <div className='flex-1 overflow-y-auto'>
        <div className='relative px-4 py-6 flex items-center'>
          <button type='button' onClick={handleBack}>
            <Image
              src='/images/logos/SettingBack.svg'
              alt='뒤로가기'
              width={12}
              height={22}
              priority
            />
          </button>
          <h1 className='absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-gray-900'>
            프로필 편집
          </h1>
        </div>
        <div className='px-4 py-6 space-y-8 pb-6'>
            <div>
              <h2 className='text-base font-medium text-gray-900 mb-4'>
                프로필 캐릭터
              </h2>
              <div className='flex flex-wrap gap-5'>
                {[1, 2, 3, 4, 5, 6].map((index) => {
                  const isSelected = selectedCharacter === index;

                  return (
                    <button
                      type='button'
                      key={index}
                      onClick={() => setSelectedCharacter(index)}
                      className={`relative w-[68px] h-[68px] rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                        isSelected ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <Image
                        src={getCharacterImage(index)}
                        alt={`캐릭터 ${index}`}
                        width={68}
                        height={68}
                        className='rounded-full object-cover'
                        priority
                      />
                      {isSelected && (
                        <div className='absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center z-10'>
                          <Image
                            src='/images/logos/Check.svg'
                            alt='선택됨'
                            width={16}
                            height={16}
                            className='w-4 h-4'
                            priority
                          />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <h2 className='text-base font-medium text-gray-900 mb-3'>
                닉네임
              </h2>
              <div className='relative'>
                <input
                  type='text'
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className='w-full px-4 py-3.5 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 text-gray-900 text-base font-medium leading-normal tracking-tight focus:outline-none focus:outline-2 focus:outline-gray-500'
                  placeholder='닉네임을 입력하세요'
                  maxLength={10}
                />
                {nickname && (
                  <button
                    type='button'
                    onClick={() => setNickname("")}
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 p-1'
                  >
                    <Image
                      src='/images/logos/DeleteBtn.svg'
                      alt='삭제'
                      width={20}
                      height={20}
                    />
                  </button>
                )}
              </div>
              <p className='text-sm text-gray-600 mt-2'>
                특수문자를 제외한 한글, 영어만 입력해주세요.({nickname.length}
                /10)
              </p>
            </div>
            <div>
              <h2 className='text-base font-medium text-gray-900 mb-3'>
                나의 목표
              </h2>
              <input
                type='text'
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className='w-full px-4 py-3.5 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 text-gray-900 text-base font-medium leading-normal tracking-tight focus:outline-none focus:outline-2 focus:outline-gray-500'
                placeholder='목표를 입력하세요'
              />
            </div>
            <div>
              <h2 className='text-base font-medium text-gray-900 mb-3'>
                목표 화면시간
              </h2>
              <div className='flex gap-3'>
                <div className='flex-1 h-12 bg-white px-5 py-3.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex items-center justify-end gap-1 overflow-hidden'>
                  <input
                    type='text'
                    inputMode='numeric'
                    pattern='[0-9]*'
                    autoComplete='off'
                    value={hours}
                    onChange={handleHoursChange}
                    className='w-[56px] bg-transparent text-right text-base font-medium text-gray-600 outline-none'
                  />
                  <span className='text-gray-400 text-base font-medium'>
                    시간
                  </span>
                </div>
                <div className='flex-1 h-12 bg-white px-5 py-3.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex items-center justify-end gap-1 overflow-hidden'>
                  <input
                    type='text'
                    inputMode='numeric'
                    pattern='[0-9]*'
                    autoComplete='off'
                    value={minutes}
                    onChange={handleMinutesChange}
                    className='w-[56px] bg-transparent text-right text-base font-medium text-gray-600 outline-none'
                  />
                  <span className='text-gray-400 text-base font-medium'>
                    분
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div className='flex-shrink-0 p-4 bg-gray-50 border-t border-gray-100'>
        <button
          type='button'
          onClick={handleSave}
          disabled={isLoading}
          className='w-full transition-colors btn-main btn-primary disabled:opacity-50 disabled:cursor-not-allowed'
        >
          저장
        </button>
      </div>
      
      {showSuccessToast && (
        <div className='fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50'>
          <div className='w-80 py-3 bg-neutral-900/90 rounded-lg inline-flex justify-center items-center gap-1.5'>
            <Image
              src='/images/logos/CopyLink.svg'
              alt='CopyLink'
              width={24}
              height={24}
              priority
            />
            <div className='text-white text-sm font-medium'>
              프로필을 수정했습니다.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
