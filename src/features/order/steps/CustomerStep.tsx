"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { OrderFormValues } from "@/features/order/schema";

export function CustomerStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<OrderFormValues>();

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Full name"
        placeholder="e.g. John Okon"
        error={errors.customerName?.message}
        {...register("customerName")}
      />

      <Input
        label="Phone number"
        type="tel"
        inputMode="tel"
        placeholder="e.g. 08012345678"
        hint="So I can reach you if anything's unclear."
        error={errors.phone?.message}
        {...register("phone")}
      />

      <Input
        label="Preferred time"
        placeholder="e.g. As soon as possible, or after 4pm"
        error={errors.preferredTime?.message}
        {...register("preferredTime")}
      />

      <Textarea
        label="Notes"
        placeholder="Anything else I should know before pickup? (optional)"
        error={errors.notes?.message}
        {...register("notes")}
      />
    </div>
  );
}
