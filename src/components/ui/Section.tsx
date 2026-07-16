import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { Tone } from "@/types/ui";

interface SectionProps {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  id?: string;
  /** Reduce top/bottom padding — used for sections that sit tight against a neighbor. */
  compact?: boolean;
}

const TONE_CLASSES: Record<Tone, string> = {
  paper: "bg-paper text-ink-teal",
  ink: "bg-ink-teal text-paper",
};

export function Section({ children, className, tone = "paper", id, compact = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        TONE_CLASSES[tone],
        compact ? "py-12 sm:py-16" : "py-20 sm:py-28",
        className,
      )}
    >
      {children}
    </section>
  );
}
