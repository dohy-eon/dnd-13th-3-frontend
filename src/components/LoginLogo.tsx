import Image from "next/image";

export default function LoginLogo() {
  return (
    <Image
      src='/images/logos/MinuLoginLogo.svg'
      alt='MINU Login Logo'
      width={205}
      height={50}
      priority
    />
  );
}
