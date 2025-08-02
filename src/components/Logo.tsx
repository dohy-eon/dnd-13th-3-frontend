import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src='/images/logos/MinuLogo.svg'
      alt='MINU Logo'
      width={84}
      height={24}
      priority
    />
  );
}
