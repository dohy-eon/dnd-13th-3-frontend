import clsx from "clsx";

interface BottomBarProps {
  disabled: boolean;
  onNext: () => void;
  label: string;
}

export default function BottomBar({ disabled, onNext, label }: BottomBarProps) {
  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-20 max-w-tablet mx-auto'>
      <div className='py-3 w-full px-screen-margin'>
        <div className='mx-auto'>
          <button
            type='button'
            onClick={onNext}
            disabled={disabled}
            className={clsx(
              "w-full py-3.5 rounded-xl font-semibold text-base leading-normal tracking-tight",
              "transition-all duration-200",
              disabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:shadow-md"
            )}
          >
            {label}
          </button>
        </div>
      </div>
    </div>
  );
}
