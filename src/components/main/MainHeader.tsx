"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MainHeader() {
  const router = useRouter();

  const handleSettingClick = () => {
    router.push("/setting");
  };
  return (
    <div className='flex justify-between items-center pt-4 px-screen-margin bg-white'>
      <Image
        src='/images/logos/MinuLogo2.svg'
        alt='MINU Logo'
        width={84}
        height={24}
        priority
      />
      <button type='button' onClick={handleSettingClick}>
        <Image
          src='/images/logos/Setting2.svg'
          alt='Settings'
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
