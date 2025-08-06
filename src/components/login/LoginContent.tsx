"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { LoginLogo } from "@/components";

interface LoginContentProps {
  className?: string;
}

export default function LoginContent({ className = "" }: LoginContentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center text-center px-4",
        "transition-opacity duration-700 ease-out",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      <p className='text-gray-100 text-pretendard mb-4'>
        <span className='font-normal'>나를 지키는 </span>
        <span className='font-bold'>작은 습관</span>
      </p>
      <LoginLogo />
    </div>
  );
}
