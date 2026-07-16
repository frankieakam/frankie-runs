"use client";

import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/constants/icons";
import { navLinks } from "@/content/nav-links";
import { useScrolled } from "@/hooks/useScrolled";
import { useOrderDialog } from "@/features/order/OrderDialogProvider";
import { MobileMenu } from "@/features/navigation/MobileMenu";
import { cn } from "@/utils/cn";

export function Navbar() {
  const scrolled = useScrolled();
  const { openOrderDialog } = useOrderDialog();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-paper/80 backdrop-blur-md shadow-[0_1px_2px_rgba(15,42,46,0.06)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm font-medium text-ink-teal/80 hover:text-ink-teal transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            variant="primary"
            size="sm"
            icon={<ArrowIcon className="h-4 w-4" />}
            onClick={openOrderDialog}
          >
            Send a request
          </Button>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
