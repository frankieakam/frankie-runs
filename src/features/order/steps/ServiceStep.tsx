"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import type { OrderFormValues } from "@/features/order/schema";
import { services } from "@/content/services";

const serviceOptions = services.map((s) => ({ label: s.title, value: s.slug }));

export function ServiceStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<OrderFormValues>();

  return (
    <div className="flex flex-col gap-4">
      <Controller
        name="service"
        control={control}
        render={({ field }) => (
          <Select
            label="Service"
            placeholder="Choose a service"
            options={serviceOptions}
            value={field.value}
            onValueChange={(value) => field.onChange(value ?? "")}
            error={errors.service?.message}
          />
        )}
      />

      <Input
        label="Pickup location"
        placeholder="e.g. Mummy Blessing's kitchen, Aka Road"
        error={errors.pickup?.message}
        {...register("pickup")}
      />

      <Input
        label="Delivery location"
        placeholder="e.g. No 12 Nwaniba Road, opposite the pharmacy"
        error={errors.delivery?.message}
        {...register("delivery")}
      />

      <Textarea
        label="Description"
        placeholder="What am I picking up? Any details that'll help me find it."
        error={errors.description?.message}
        {...register("description")}
      />
    </div>
  );
}
