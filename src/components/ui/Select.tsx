"use client";

import { useId } from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | null) => void;
  error?: string;
  name?: string;
}

export function Select({
  label,
  placeholder = "Select an option",
  options,
  value,
  defaultValue,
  onValueChange,
  error,
  name,
}: SelectProps) {
  const generatedId = useId();
  const errorId = `${generatedId}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <BaseSelect.Root
        items={options}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        name={name}
      >
        <BaseSelect.Label className="font-sans text-sm font-medium text-ink-teal cursor-default">
          {label}
        </BaseSelect.Label>
        <BaseSelect.Trigger
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "flex h-12 w-full items-center justify-between gap-2 rounded-md border border-ink-teal/15 bg-white px-4",
            "font-sans text-base text-ink-teal select-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-teal/60 focus-visible:border-ink-teal/60",
            "data-popup-open:ring-2 data-popup-open:ring-ink-teal/60",
            error && "border-amber-deep",
          )}
        >
          <BaseSelect.Value
            className="data-placeholder:text-ink-teal/65"
            placeholder={placeholder}
          />
          <BaseSelect.Icon>
            <ChevronDown className="h-4 w-4 text-ink-teal/50" aria-hidden />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
        <BaseSelect.Portal>
          <BaseSelect.Positioner sideOffset={6} className="z-50 select-none outline-none">
            <BaseSelect.Popup
              className={cn(
                "min-w-(--anchor-width) origin-(--transform-origin) overflow-hidden rounded-md border border-ink-teal/10",
                "bg-white shadow-soft-lg outline-none",
                "transition-[scale,opacity] duration-100 ease-out",
                "data-starting-style:scale-98 data-starting-style:opacity-0",
                "data-ending-style:scale-98 data-ending-style:opacity-0",
              )}
            >
              <BaseSelect.List className="max-h-(--available-height) overflow-y-auto py-1">
                {options.map((option) => (
                  <BaseSelect.Item
                    key={option.value}
                    value={option.value}
                    className={cn(
                      "grid cursor-default grid-cols-[1rem_1fr] items-center gap-2.5 px-3 py-2.5",
                      "font-sans text-sm text-ink-teal outline-none select-none",
                      "data-highlighted:bg-ink-teal/6",
                    )}
                  >
                    <BaseSelect.ItemIndicator className="col-start-1">
                      <Check className="h-4 w-4 text-amber-deep" aria-hidden />
                    </BaseSelect.ItemIndicator>
                    <BaseSelect.ItemText className="col-start-2">{option.label}</BaseSelect.ItemText>
                  </BaseSelect.Item>
                ))}
              </BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-amber-deep">
          {error}
        </p>
      )}
    </div>
  );
}
