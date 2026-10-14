import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

// Side padding: 16px on phones, 32px on desktop, never less than the device safe area.
const gutters =
  "pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] lg:pl-[max(2rem,env(safe-area-inset-left))] lg:pr-[max(2rem,env(safe-area-inset-right))]";

export default function Container({ children, className = "" }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-[1200px] ${gutters} ${className}`}>{children}</div>;
}
