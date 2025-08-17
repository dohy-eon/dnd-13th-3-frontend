import type React from "react";

export default function TimeInput({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}) {
  return (
    <div className='flex-1 h-12 px-3 py-1.5 border-b border-gray-200 flex justify-end items-center gap-1 overflow-hidden'>
      <input
        type='number'
        value={value}
        onChange={onChange}
        className='text-right text-gray-900 text-base font-medium font-pretendard leading-normal tracking-tight bg-transparent outline-none'
        placeholder='0'
      />
      <span
        className={`text-gray-400 text-base font-medium font-pretendard leading-normal tracking-tight ${label === "시간" ? "whitespace-nowrap" : ""}`}
      >
        {label}
      </span>
    </div>
  );
}
