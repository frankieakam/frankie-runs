import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ButtonVariant, Size } from "@/types/ui";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-amber text-ink-teal hover:bg-amber-soft active:bg-amber shadow-(--shadow-soft-sm) hover:shadow-(--shadow-soft-md)",
  secondary:
    "bg-transparent text-ink-teal border border-ink-teal/20 hover:bg-ink-teal/5 active:bg-ink-teal/10",
  ghost: "bg-transparent text-ink-teal hover:bg-ink-teal/5 active:bg-ink-teal/10",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-6 text-base gap-2",
  lg: "h-14 px-8 text-lg gap-2.5",
};

function getButtonClasses(
  variant: ButtonVariant,
  size: Size,
  fullWidth: boolean,
  className?: string,
): string {
  return cn(
    "inline-flex items-center justify-center rounded-full font-sans font-semibold",
    "transition-colors duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-teal focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
    "disabled:opacity-50 disabled:pointer-events-none",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth && "w-full",
    className,
  );
}

function ButtonIcons({
  icon,
  iconPosition,
  children,
}: {
  icon?: ReactNode;
  iconPosition: "left" | "right";
  children: ReactNode;
}) {
  return (
    <>
      {icon && iconPosition === "left" && (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "right",
    fullWidth = false,
    className,
    children,
    disabled,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={getButtonClasses(variant, size, fullWidth, className)}
      {...props}
    >
      <ButtonIcons icon={icon} iconPosition={iconPosition}>
        {children}
      </ButtonIcons>
    </button>
  );
});

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

/** Button-styled anchor — for same-page section links or external links that shouldn't be <button>s. */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  {
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "right",
    fullWidth = false,
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <a ref={ref} className={getButtonClasses(variant, size, fullWidth, className)} {...props}>
      <ButtonIcons icon={icon} iconPosition={iconPosition}>
        {children}
      </ButtonIcons>
    </a>
  );
});
