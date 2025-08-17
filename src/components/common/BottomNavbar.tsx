"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function BottomNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isHomeActive = pathname === "/main" || pathname === "/timer";
  const isChallengeActive = pathname === "/challenge";
  const isRecordActive = pathname === "/record";
  const navItems = [
    {
      href: "/challenge",
      label: "챌린지",
      alt: "challenge",
      isActive: isChallengeActive,
      icon: "Medal",
    },
    {
      href: "/main",
      label: "홈",
      alt: "home",
      isActive: isHomeActive,
      icon: "Home",
    },
    {
      href: "/record",
      label: "기록",
      alt: "record",
      isActive: isRecordActive,
      icon: "Record",
    },
  ];

  return (
    <div className='max-w-[272px] mx-auto pb-4 sticky bottom-0 bg-transparent'>
      <div className='w-full px-4 bg-white rounded-[32px] outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-between items-center'>
        {navItems.map(({ href, label, alt, isActive, icon }) => (
          <button
            key={href}
            type='button'
            onClick={() => router.push(href)}
            aria-current={isActive ? "page" : undefined}
            className='h-16 min-w-20 px-4 py-2.5 inline-flex flex-col justify-center items-center gap-0.5'
          >
            <Image
              src={`/images/logos/${icon}${isActive ? "Active" : ""}.svg`}
              alt={alt}
              width={24}
              height={24}
            />
            <span
              className={
                isActive
                  ? "text-primary text-xs font-semibold leading-none tracking-tight"
                  : "text-gray-400 text-xs font-medium leading-none tracking-tight"
              }
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
