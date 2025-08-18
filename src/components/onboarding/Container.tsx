"use client";

import clsx from "clsx";
import { memo, type PropsWithChildren } from "react";

interface ContainerProps {
  className?: string;
}

function Container({ className, children }: PropsWithChildren<ContainerProps>) {
  return (
    <div className={clsx("w-full px-screen-margin", className)}>
      <div className='mx-auto'>{children}</div>
    </div>
  );
}

export default memo(Container);
