import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { Size } from "@/types/ui";

type SharedProps = {
  children?: ReactNode;
  size?: Size;
  variant?: "solid" | "ghost";
  /** Required — icon-only buttons must always have an accessible name. */
  "aria-label": string;
  className?: string;
};

export type IconButtonProps = SharedProps &
  (
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  );

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

const VARIANT_CLASSES = {
  solid: "bg-ink-teal text-paper hover:bg-ink-soft",
  ghost: "bg-transparent text-ink-teal hover:bg-ink-teal/8",
};

export const IconButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, IconButtonProps>(
  function IconButton({ children, size = "md", variant = "ghost", className, href, ...props }, ref) {
    const classes = cn(
      "inline-flex items-center justify-center rounded-full transition-colors duration-150 ease-out shrink-0",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-teal focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
      VARIANT_CLASSES[variant],
      SIZE_CLASSES[size],
      className,
    );

    if (href !== undefined) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          <span aria-hidden="true">{children}</span>
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        <span aria-hidden="true">{children}</span>
      </button>
    );
  },
);
