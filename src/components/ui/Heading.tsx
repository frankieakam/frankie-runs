import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils/cn";

type HeadingLevel = 1 | 2 | 3 | 4;

interface HeadingProps {
  children: ReactNode;
  /** Semantic heading level (h1-h4) — keep this matched to document outline, independent of visual size. */
  level?: HeadingLevel;
  /** Visual size — defaults to matching `level`, but can be set independently for cases like a small eyebrow heading. */
  size?: HeadingLevel;
  className?: string;
  as?: ElementType;
}

const SIZE_CLASSES: Record<HeadingLevel, string> = {
  1: "text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05]",
  2: "text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.08]",
  3: "text-2xl sm:text-3xl font-bold leading-tight",
  4: "text-xl sm:text-2xl font-bold leading-tight",
};

export function Heading({ children, level = 2, size, className, as }: HeadingProps) {
  const Tag = as ?? (`h${level}` as ElementType);
  return (
    <Tag className={cn("font-display", SIZE_CLASSES[size ?? level], className)}>
      {children}
    </Tag>
  );
}
