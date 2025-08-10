"use client";

import clsx from "clsx";
import { memo, type PropsWithChildren } from "react";
import SelectedIndicator from "./SelectedIndicator";

interface SelectableButtonProps {
  selected?: boolean;
  className?: string;
  onClick?: () => void;
}

function SelectableButton({
  selected,
  className,
  children,
  onClick,
}: PropsWithChildren<SelectableButtonProps>) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={clsx(
        "w-full px-6 py-3.5 rounded-xl text-left flex items-center justify-between transition-colors",
        selected
          ? "bg-indigo-100 outline outline-1 outline-offset-[-1px] outline-indigo-500 text-indigo-500 font-semibold"
          : "bg-gray-100 text-gray-600 font-medium",
        className
      )}
    >
      <span className='text-body-1'>{children}</span>
      {selected && <SelectedIndicator />}
    </button>
  );
}

export default memo(SelectableButton);
