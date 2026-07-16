"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { ResponsiveDialog } from "@/components/ui/ResponsiveDialog";

// react-hook-form + zod + the resolver bridge only matter once someone
// actually opens the dialog — splitting this out keeps them off the
// initial page bundle entirely instead of loading on every visit.
const OrderForm = dynamic(
  () => import("@/features/order/OrderForm").then((mod) => mod.OrderForm),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-48 items-center justify-center">
        <div
          className="h-6 w-6 animate-spin rounded-full border-2 border-ink-teal/20 border-t-ink-teal"
          role="status"
          aria-label="Loading form"
        />
      </div>
    ),
  },
);

interface OrderDialogContextValue {
  openOrderDialog: () => void;
}

const OrderDialogContext = createContext<OrderDialogContextValue | null>(null);

/**
 * Wraps the site and owns the single order dialog instance. Every
 * "Send a request" / WhatsApp CTA across the page calls `openOrderDialog()`
 * from `useOrderDialog()` rather than rendering its own dialog — this is
 * what the brief means by "every WhatsApp CTA opens the same order dialog."
 */
export function OrderDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  // Once true, stays true — this is what triggers the dynamic import on
  // first use. OrderForm then stays mounted across future opens/closes so
  // the dialog's exit animation has real content to animate out, instead
  // of the form vanishing mid-transition.
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  const openOrderDialog = () => {
    setHasOpenedOnce(true);
    setOpen(true);
  };

  return (
    <OrderDialogContext.Provider value={{ openOrderDialog }}>
      {children}
      <ResponsiveDialog
        open={open}
        onOpenChange={setOpen}
        title="Send a request"
        description="Tell Frankie what you need and he'll take it from there."
      >
        {hasOpenedOnce && <OrderForm dialogOpen={open} />}
      </ResponsiveDialog>
    </OrderDialogContext.Provider>
  );
}

export function useOrderDialog(): OrderDialogContextValue {
  const ctx = useContext(OrderDialogContext);
  if (!ctx) {
    throw new Error("useOrderDialog must be used within an OrderDialogProvider");
  }
  return ctx;
}
