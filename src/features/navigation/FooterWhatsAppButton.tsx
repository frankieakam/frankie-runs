"use client";

import { IconButton } from "@/components/ui/IconButton";
import { WhatsAppIcon } from "@/constants/social-icons";
import { useOrderDialog } from "@/features/order/OrderDialogProvider";

/**
 * The footer's WhatsApp icon deliberately opens the order dialog rather
 * than linking straight to wa.me — every WhatsApp touchpoint on the site
 * goes through the same dialog, per the brief.
 */
export function FooterWhatsAppButton() {
  const { openOrderDialog } = useOrderDialog();
  return (
    <IconButton
      aria-label="Send a request on WhatsApp"
      variant="ghost"
      size="sm"
      className="text-paper hover:bg-paper/10"
      onClick={openOrderDialog}
    >
      <WhatsAppIcon className="h-4 w-4" />
    </IconButton>
  );
}
