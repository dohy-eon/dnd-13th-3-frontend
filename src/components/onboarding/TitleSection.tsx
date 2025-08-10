"use client";

import clsx from "clsx";
import { memo } from "react";

interface TitleSectionProps {
  title: string;
  subtitle?: string;
  compact?: boolean; // step2/3와 같이 제목-부제 간격을 좁힐 때
  subtitleClassName?: string; // 필요 시 타입스케일/굵기 커스텀
}

function TitleSection({
  title,
  subtitle,
  compact,
  subtitleClassName,
}: TitleSectionProps) {
  return (
    <div>
      <h1
        className={clsx(
          "text-heading-1 font-bold text-gray-900 mt-9",
          compact ? "mb-1" : "mb-6"
        )}
      >
        {title}
      </h1>
      {subtitle ? (
        <p
          className={
            subtitleClassName ??
            "text-body-1 font-normal text-gray-400 tracking-tight mb-6"
          }
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export default memo(TitleSection);
