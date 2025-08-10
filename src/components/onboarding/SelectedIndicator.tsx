"use client";

import { Check } from "lucide-react";
import { memo } from "react";

function SelectedIndicator() {
  return (
    <div className='w-6 h-6 inline-flex items-center justify-center'>
      <div className='w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center'>
        <Check className='w-3.5 h-3.5 text-white' strokeWidth={3} />
      </div>
    </div>
  );
}

export default memo(SelectedIndicator);
