"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface ChallengeHeaderProps {
  hasChallenge: boolean;
}

export default function ChallengeHeader({
  hasChallenge,
}: ChallengeHeaderProps) {
  const router = useRouter();

  const handleSettingClick = () => {
    router.push("/setting");
  };

  if (hasChallenge) {
    return (
      <div className='flex justify-between items-center pt-4 px-screen-margin bg-secondary'>
        <Image
          src='/images/logos/MinuLogo2.svg'
          alt='MINU Logo'
          width={84}
          height={24}
          priority
        />
        <div className='flex items-center gap-2'>
          <button type='button'>
            <Image
              src='/images/logos/Add.svg'
              alt='Add'
              width={24}
              height={24}
            />
          </button>
          <button type='button' onClick={handleSettingClick}>
            <Image
              src='/images/logos/Setting2.svg'
              alt='Settings'
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-between items-center pt-4 px-screen-margin bg-primary'>
      <Image
        src='/images/logos/MinuLogo2.svg'
        alt='MINU Logo'
        width={84}
        height={24}
        priority
      />
      <div className='flex items-center gap-2'>
        <button type='button'>
          <Image
            src='/images/logos/History.svg'
            alt='Add'
            width={24}
            height={24}
          />
        </button>
        <button type='button' onClick={handleSettingClick}>
          <Image
            src='/images/logos/Setting.svg'
            alt='Settings'
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
}
