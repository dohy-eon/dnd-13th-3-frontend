"use client";
import Image from "next/image";

interface MissionSelectButtonProps {
  selectedMission: string;
  isModalOpen: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function MissionSelectButton({
  selectedMission,
  isModalOpen,
  onClick,
  disabled = false,
}: MissionSelectButtonProps) {
  const getButtonStyle = () => {
    if (disabled) {
      return "px-5 py-2 bg-gray-200 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-300 inline-flex justify-center items-center gap-1 mb-8 cursor-not-allowed";
    }

    if (selectedMission) {
      return "px-5 py-2 bg-gray-100 rounded-2xl outline outline-1 outline-offset-[-1px] outline-point inline-flex justify-center items-center gap-1 mb-8";
    }

    return "px-5 py-2 bg-gray-100 rounded-2xl outline outline-1 outline-offset-[-1px] outline-point inline-flex justify-center items-center gap-1 mb-8";
  };

  const getTextStyle = () => {
    if (disabled) {
      return "justify-start text-gray-500 text-base font-medium leading-normal tracking-tight";
    }

    if (selectedMission) {
      return "justify-start text-primary text-base font-medium leading-normal tracking-tight";
    }

    return "justify-start text-primary text-base font-medium leading-normal tracking-tight";
  };

  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={getButtonStyle()}
    >
      <span className={getTextStyle()}>{selectedMission || "모드 선택"}</span>
      <div className='w-5 h-5 relative'>
        <Image
          src='/images/logos/ArrowBottom.svg'
          alt='arrow'
          width={20}
          height={20}
          className={`transition-transform duration-300 ${isModalOpen ? "rotate-180" : ""} ${disabled ? "opacity-50" : ""}`}
        />
      </div>
    </button>
  );
}
