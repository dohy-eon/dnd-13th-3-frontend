"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginContent } from "@/components/login";

export default function SplashPage() {
  const router = useRouter();
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3000);

    const redirectTimer = setTimeout(() => {
      router.push("/login");
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <main className='flex flex-col min-h-screen bg-primary relative items-center justify-center'>
      <div className={clsx(isFadingOut ? "animate-fade-out" : "opacity-100")}>
        <LoginContent />
      </div>
    </main>
  );
}
