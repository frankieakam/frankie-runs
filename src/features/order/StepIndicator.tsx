import { CheckIcon } from "@/constants/icons";
import { cn } from "@/utils/cn";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <ol className="flex items-center gap-2" aria-label="Request progress">
      {Array.from({ length: totalSteps }, (_, i) => {
        const isComplete = i < currentStep;
        const isCurrent = i === currentStep;
        return (
          <li key={i} className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-medium transition-colors",
                isComplete && "bg-sage text-ink-teal",
                isCurrent && "bg-amber text-ink-teal",
                !isComplete && !isCurrent && "bg-ink-teal/10 text-ink-teal/70",
              )}
              aria-current={isCurrent ? "step" : undefined}
            >
              {isComplete ? <CheckIcon className="h-3.5 w-3.5" aria-hidden /> : i + 1}
            </span>
            <span className="sr-only">{labels[i]}</span>
            {i < totalSteps - 1 && <span className="h-px w-5 bg-ink-teal/15" aria-hidden />}
          </li>
        );
      })}
    </ol>
  );
}
