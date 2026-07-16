"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { cn } from "@/utils/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Lift slightly on hover — used for interactive cards like service tiles. */
  interactive?: boolean;
  as?: "div" | "article" | "li";
}

export function Card({ children, className, interactive = false, as = "div" }: CardProps) {
  const MotionTag = m[as];
  return (
    <MotionTag
      className={cn(
        "rounded-xl bg-white/60 shadow-soft-md ring-1 ring-ink-teal/5 overflow-hidden",
        className,
      )}
      whileHover={interactive ? { y: -4, boxShadow: "var(--shadow-soft-lg)" } : undefined}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
