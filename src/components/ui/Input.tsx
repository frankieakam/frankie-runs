import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, id, className, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="font-sans text-sm font-medium text-ink-teal">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        className={cn(
          "h-12 rounded-md border border-ink-teal/15 bg-white px-4 font-sans text-base text-ink-teal",
          "placeholder:text-ink-teal/65",
          "focus:outline-none focus:ring-2 focus:ring-ink-teal/60 focus:border-ink-teal/60",
          error && "border-amber-deep focus:ring-amber-deep/60 focus:border-amber-deep",
          className,
        )}
        {...props}
      />
      {hint && !error && (
        <p id={hintId} className="text-xs text-ink-teal/70">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-amber-deep">
          {error}
        </p>
      )}
    </div>
  );
});
