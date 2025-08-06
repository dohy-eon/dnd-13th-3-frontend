"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

export default function CloudLayer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={clsx(
        "absolute w-[429px] h-[607px] top-[313px] left-1/2 -translate-x-1/2",
        "transition-opacity duration-1000 ease-out",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        className={clsx(
          "absolute w-[254px] h-[529px] top-0 left-[5px]",
          "rounded-[150px_150px_0px_0px]",
          "bg-[linear-gradient(180deg,rgba(212,221,252,1)_0%,rgba(110,144,255,0.9)_100%)]"
        )}
      />
      <div
        className={clsx(
          "absolute w-[249px] h-[396px] top-[133px] left-[180px]",
          "rounded-[120px_120px_0px_0px]",
          "bg-[linear-gradient(180deg,rgba(212,220,246,1)_0%,rgba(110,144,255,0.9)_100%)]"
        )}
      />
      <div
        className={clsx(
          "absolute w-[286px] h-[331px] top-[276px] left-0",
          "rounded-[150px_150px_0px_0px]",
          "bg-[linear-gradient(180deg,rgba(212,220,246,0.9)_0%,rgba(110,144,255,0.9)_100%)]"
        )}
      />
    </div>
  );
}
