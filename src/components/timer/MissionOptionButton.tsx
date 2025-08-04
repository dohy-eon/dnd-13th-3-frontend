"use client";

interface MissionOptionButtonProps {
  mission: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function MissionOptionButton({
  mission,
  isSelected,
  onClick,
}: MissionOptionButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`px-4 py-2 rounded-[46px] outline outline-1 outline-offset-[-1px] transition-colors ${
        isSelected
          ? "bg-primary/10 outline-primary text-primary text-xs font-semibold"
          : "bg-white outline-gray-200 text-gray-600 text-xs font-medium"
      }`}
    >
      {mission}
    </button>
  );
}
