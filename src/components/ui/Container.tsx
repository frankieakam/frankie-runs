import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Use a narrower max-width for text-heavy content like FAQ. */
  size?: "default" | "narrow";
}

const MAX_WIDTH = {
  default: "max-w-7xl",
  narrow: "max-w-3xl",
};

export function Container({ children, className, size = "default" }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6 sm:px-8 lg:px-12", MAX_WIDTH[size], className)}>
      {children}
    </div>
  );
}
