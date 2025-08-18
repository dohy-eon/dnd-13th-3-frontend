import Image from "next/image";

interface LogoProps {
  isChallengePage?: boolean;
}

export default function Logo({ isChallengePage = false }: LogoProps) {
  return (
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
  );
}
