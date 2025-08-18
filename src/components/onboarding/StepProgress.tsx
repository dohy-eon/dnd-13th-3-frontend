import clsx from "clsx";
import { memo, useMemo } from "react";
import { TOTAL_STEPS } from "@/lib/onboarding";

function StepProgress({ currentStep }: { currentStep: number }) {
  const stepKeys = useMemo(
    () => Array.from({ length: TOTAL_STEPS }, (_, i) => `step-${i + 1}`),
    []
  );
  return (
    <div className='w-full py-3 px-screen-margin'>
      <div className='w-full mx-auto grid grid-cols-3 gap-3'>
        {stepKeys.map((key, idx) => (
          <div
            key={key}
            className={clsx(
              "h-1 rounded-xs w-full",
              idx < currentStep ? "bg-primary" : "bg-gray-100"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(StepProgress);
