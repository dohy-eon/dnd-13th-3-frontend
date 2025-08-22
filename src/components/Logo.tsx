import Image from "next/image";

interface LogoProps {
  isChallengePage?: boolean;
}

export default function Logo({ isChallengePage = false }: LogoProps) {
  return (
    <div className='w-full bg-white'>
      <div className='pt-4 px-screen-margin'>
        <Image
          src={
            isChallengePage
              ? "/images/logos/MinuLogoWhite.svg"
              : "/images/logos/MinuLogo.svg"
          }
          alt='MINU Logo'
          width={84}
          height={24}
          priority
        />
      </div>
    </div>
  );
}
