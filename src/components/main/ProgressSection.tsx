import Image from "next/image";
import { getCharacterImage } from "@/utils/character";

interface ProgressSectionProps {
  todayScreenTime: number;
  goalScreenTime: number;
  characterIndex?: number;
}

const ProgressSection = ({
  todayScreenTime,
  goalScreenTime,
  characterIndex,
}: ProgressSectionProps) => {
  const progressPercentage =
    goalScreenTime > 0 ? (todayScreenTime / goalScreenTime) * 100 : 0;

  const characterPosition = progressPercentage > 92 ? 92 : progressPercentage;

  const isOverTime = progressPercentage > 100;
  const characterImageSrc = isOverTime
    ? "/images/logos/Error.svg"
    : getCharacterImage(characterIndex);

  return (
    <div className='relative w-full max-w-full flex flex-col items-center mt-[243px]'>
      <div
        className={`relative h-4 w-full rounded-full ${progressPercentage <= 100 ? "bg-white" : ""}`}
        style={
          progressPercentage > 100
            ? {
                backgroundImage: `url('/images/logos/screentimeOver.svg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        <div className='absolute -bottom-5 w-full flex justify-between items-center'>
          <div className='text-gray-600 text-sm font-medium font-pretendard mt-2'>
            치유중
          </div>
          <div className='text-gray-600 text-sm font-medium font-pretendard mt-2'>
            {Math.floor(goalScreenTime / 60)}시간{" "}
            {goalScreenTime % 60 > 0 ? `${goalScreenTime % 60}분` : ""}
          </div>
        </div>
        <div
          className={`absolute h-4 rounded-full ${progressPercentage > 100 ? "bg-red-500" : "bg-primary"}`}
          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
        ></div>
        <div
          className={`absolute bottom-4 transition-all duration-500 z-30`}
          style={{ left: `calc(${characterPosition}% - 20%)` }}
        >
          <Image
            src={characterImageSrc}
            alt='character'
            width={60}
            height={60}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
