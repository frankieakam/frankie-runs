import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface TextProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  /** Muted body text (e.g. supporting copy under a headline) at 80% opacity of current color. */
  muted?: boolean;
  className?: string;
  as?: ElementType;
}

const SIZE_CLASSES = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg sm:text-xl",
};

export function Text({ children, size = "md", muted = false, className, as = "p" }: TextProps) {
  const Tag = as;
  return (
    <Tag className={cn("font-sans", SIZE_CLASSES[size], muted && "opacity-75", className)}>
      {children}
    </Tag>
  );
}

interface LabelProps {
  children: ReactNode;
  className?: string;
  tone?: "amber" | "sage" | "muted";
  /**
   * Which background this sits on. "amber"/"sage" resolve to darkened
   * "-deep" variants on light (paper) surfaces — the base amber and sage
   * fail WCAG AA contrast against paper at any opacity, so this isn't
   * optional polish, it's what keeps this component safe to use anywhere
   * by default without each call site re-deriving the right shade.
   */
  surface?: "onLight" | "onDark";
}

const LABEL_TONE_CLASSES: Record<"onLight" | "onDark", Record<"amber" | "sage" | "muted", string>> = {
  onLight: {
    amber: "text-amber-deep",
    sage: "text-sage-deep",
    muted: "opacity-70",
  },
  onDark: {
    amber: "text-amber",
    sage: "text-sage",
    muted: "opacity-70",
  },
};

/** Small mono eyebrow/label text — used for section kickers, prices, phone numbers. */
export function Label({ children, className, tone = "muted", surface = "onLight" }: LabelProps) {
  return (
    <span
      className={cn(
        "font-mono text-xs sm:text-sm uppercase tracking-[0.18em]",
        LABEL_TONE_CLASSES[surface][tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
