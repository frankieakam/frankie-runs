"use client";

import { useFormContext } from "react-hook-form";
import { Text } from "@/components/ui/Text";
import { businessConfig } from "@/config/business";
import { services } from "@/content/services";
import type { OrderFormValues } from "@/features/order/schema";

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-2.5 border-b border-ink-teal/10 last:border-b-0">
      <span className="font-mono text-[11px] uppercase tracking-wide text-ink-teal/70">
        {label}
      </span>
      <span className="font-sans text-sm text-ink-teal">{value}</span>
    </div>
  );
}

export function ReviewStep() {
  const { getValues } = useFormContext<OrderFormValues>();
  const values = getValues();
  const serviceTitle = services.find((s) => s.slug === values.service)?.title ?? values.service;

  return (
    <div className="flex flex-col gap-5">
      <Text size="sm" muted>
        Double-check everything below before this goes to Frankie on WhatsApp.
      </Text>

      <div className="rounded-lg border border-ink-teal/10 px-4">
        <ReviewRow label="Service" value={serviceTitle} />
        <ReviewRow label="Pickup" value={values.pickup} />
        <ReviewRow label="Delivery" value={values.delivery} />
        <ReviewRow label="Description" value={values.description} />
        <ReviewRow label="Customer" value={values.customerName} />
        <ReviewRow label="Phone" value={values.phone} />
        <ReviewRow label="Preferred time" value={values.preferredTime} />
        {values.notes && values.notes.trim().length > 0 && (
          <ReviewRow label="Notes" value={values.notes} />
        )}
      </div>

      {/* Fixed, non-editable payment line — this is informational, not a payment form. */}
      <div className="rounded-lg bg-sage/15 border border-sage/40 px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-teal/70">
          Payment
        </span>
        <p className="font-sans text-sm font-medium text-ink-teal mt-0.5">
          {businessConfig.payment.displayLine}
        </p>
      </div>
    </div>
  );
}
