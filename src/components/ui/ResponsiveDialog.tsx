"use client";

import type { ReactNode } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { IconButton } from "@/components/ui/IconButton";
import { CloseIcon } from "@/constants/icons";
import { cn } from "@/utils/cn";

interface ResponsiveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Required for accessibility — announced by screen readers when the dialog opens. */
  title: string;
  description?: string;
  /** Visually hide the title/description while keeping them for screen readers, when the content below already renders its own visible heading. */
  visuallyHideHeader?: boolean;
  children: ReactNode;
}

const backdropClasses = cn(
  "fixed inset-0 bg-ink-teal/40 backdrop-blur-sm",
  "transition-opacity duration-200 ease-out",
  "data-starting-style:opacity-0 data-ending-style:opacity-0",
);

const popupBaseClasses = cn(
  "flex flex-col gap-5 bg-paper text-ink-teal outline-none",
  "shadow-[0_12px_40px_rgba(15,42,46,0.12),0_4px_12px_rgba(15,42,46,0.06)]",
);

function DialogHeaderText({
  title,
  description,
  visuallyHideHeader,
  TitleComponent,
  DescriptionComponent,
}: {
  title: string;
  description?: string;
  visuallyHideHeader?: boolean;
  TitleComponent: typeof BaseDialog.Title | typeof BaseDrawer.Title;
  DescriptionComponent: typeof BaseDialog.Description | typeof BaseDrawer.Description;
}) {
  return (
    <div className={visuallyHideHeader ? "sr-only" : "flex flex-col gap-1"}>
      <TitleComponent className="font-display text-xl font-semibold text-ink-teal">
        {title}
      </TitleComponent>
      {description && (
        <DescriptionComponent className="font-sans text-sm text-ink-teal/70">
          {description}
        </DescriptionComponent>
      )}
    </div>
  );
}

export function ResponsiveDialog({
  open,
  onOpenChange,
  title,
  description,
  visuallyHideHeader = false,
  children,
}: ResponsiveDialogProps) {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return (
      <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
        <BaseDialog.Portal>
          <BaseDialog.Backdrop className={backdropClasses} />
          <BaseDialog.Popup
            className={cn(
              popupBaseClasses,
              "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-[calc(100vw-3rem)] max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl p-6 sm:p-8",
              "transition-[transform,opacity] duration-200 ease-out",
              "data-starting-style:opacity-0 data-starting-style:scale-97",
              "data-ending-style:opacity-0 data-ending-style:scale-97",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <DialogHeaderText
                title={title}
                description={description}
                visuallyHideHeader={visuallyHideHeader}
                TitleComponent={BaseDialog.Title}
                DescriptionComponent={BaseDialog.Description}
              />
              <BaseDialog.Close
                render={
                  <IconButton aria-label="Close dialog" size="sm" variant="ghost" className="-mr-1 -mt-1 shrink-0" />
                }
              >
                <CloseIcon className="h-5 w-5" aria-hidden />
              </BaseDialog.Close>
            </div>
            {children}
          </BaseDialog.Popup>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    );
  }

  return (
    <BaseDrawer.Root open={open} onOpenChange={onOpenChange} swipeDirection="down">
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop className={backdropClasses} />
        <BaseDrawer.Viewport className="fixed inset-x-0 bottom-0 flex justify-center">
          <BaseDrawer.Popup
            className={cn(
              popupBaseClasses,
              "w-full max-h-[88vh] overflow-y-auto rounded-t-2xl p-6",
              "pb-[calc(1.5rem+env(safe-area-inset-bottom))]",
              "transform-[translateY(var(--drawer-swipe-movement-y,0px))]",
              "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
              "data-swiping:duration-0",
              "data-starting-style:translate-y-full data-ending-style:translate-y-full",
            )}
          >
            <div className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-ink-teal/15" aria-hidden />
            <div className="flex items-start justify-between gap-4">
              <DialogHeaderText
                title={title}
                description={description}
                visuallyHideHeader={visuallyHideHeader}
                TitleComponent={BaseDrawer.Title}
                DescriptionComponent={BaseDrawer.Description}
              />
              <BaseDrawer.Close
                render={
                  <IconButton aria-label="Close sheet" size="sm" variant="ghost" className="-mr-1 shrink-0" />
                }
              >
                <CloseIcon className="h-5 w-5" aria-hidden />
              </BaseDrawer.Close>
            </div>
            {children}
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}
