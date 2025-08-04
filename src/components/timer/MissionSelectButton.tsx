"use client";
import Image from "next/image";

interface MissionSelectButtonProps {
  selectedMission: string;
  isModalOpen: boolean;
  onClick: () => void;
}

export default function MissionSelectButton({
  selectedMission,
  isModalOpen,
  onClick,
}: MissionSelectButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='px-5 py-2 bg-gray-100 rounded-2xl outline outline-1 outline-offset-[-1px] outline-primary/30 inline-flex justify-center items-center gap-1 mb-8'
    >
      <span className='justify-start text-primary text-base font-medium leading-normal tracking-tight'>
        {selectedMission || "모드 선택"}
      </span>
      <div className='w-4 h-4 relative'>
        <Image
          src='/images/logos/ArrowBottom.svg'
          alt='화살표'
          width={16}
          height={16}
          className={`transition-transform duration-300 ${isModalOpen ? "rotate-180" : ""}`}
        />
      </div>
    </button>
  );
}
