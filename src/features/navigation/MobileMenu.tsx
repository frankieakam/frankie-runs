"use client";

import { useEffect, useState } from "react";
import { Drawer } from "@base-ui/react/drawer";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";
import { MenuIcon, CloseIcon, ArrowIcon } from "@/constants/icons";
import { navLinks } from "@/content/nav-links";
import { useOrderDialog } from "@/features/order/OrderDialogProvider";
import { cn } from "@/utils/cn";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { openOrderDialog } = useOrderDialog();

  // Toggle the page-shell scale effect (see globals.css) while the sheet is open.
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    return () => document.documentElement.classList.remove("menu-open");
  }, [open]);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection="right">
      <Drawer.Trigger
        render={<IconButton aria-label="Open menu" variant="ghost" className="md:hidden" />}
      >
        <MenuIcon className="h-6 w-6" aria-hidden />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop
          className={cn(
            "fixed inset-0 bg-ink-teal/40 backdrop-blur-sm",
            "transition-opacity duration-300 ease-out",
            "data-starting-style:opacity-0 data-ending-style:opacity-0",
          )}
        />
        <Drawer.Viewport className="fixed inset-y-0 right-0 flex">
          <Drawer.Popup
            className={cn(
              "flex h-full w-[82vw] max-w-sm flex-col gap-1 bg-paper p-6",
              "shadow-[0_12px_40px_rgba(15,42,46,0.12),0_4px_12px_rgba(15,42,46,0.06)] outline-none",
              "transform-[translateX(var(--drawer-swipe-movement-x,0px))]",
              "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
              "data-swiping:duration-0",
              "data-starting-style:translate-x-full data-ending-style:translate-x-full",
            )}
          >
            <div className="flex items-center justify-between mb-6">
              <Drawer.Title className="font-display text-lg font-semibold text-ink-teal">
                Menu
              </Drawer.Title>
              <Drawer.Close
                render={<IconButton aria-label="Close menu" variant="ghost" />}
              >
                <CloseIcon className="h-5 w-5" aria-hidden />
              </Drawer.Close>
            </div>

            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Drawer.Close
                  key={link.href}
                  nativeButton={false}
                  render={
                    <a
                      href={link.href}
                      className="rounded-md px-3 py-3 font-sans text-base text-ink-teal hover:bg-ink-teal/5"
                    />
                  }
                >
                  {link.label}
                </Drawer.Close>
              ))}
            </nav>

            <div className="mt-auto pt-6">
              <Drawer.Close
                render={
                  <Button
                    variant="primary"
                    fullWidth
                    icon={<ArrowIcon className="h-4 w-4" />}
                    onClick={openOrderDialog}
                  />
                }
              >
                Send a request
              </Drawer.Close>
            </div>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
