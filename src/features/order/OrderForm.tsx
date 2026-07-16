"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/constants/icons";
import { StepIndicator } from "@/features/order/StepIndicator";
import { ServiceStep } from "@/features/order/steps/ServiceStep";
import { CustomerStep } from "@/features/order/steps/CustomerStep";
import { ReviewStep } from "@/features/order/steps/ReviewStep";
import { SuccessScreen } from "@/features/order/SuccessScreen";
import {
  ORDER_FORM_DEFAULTS,
  orderFormSchema,
  STEP_FIELDS,
  type OrderFormValues,
} from "@/features/order/schema";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/features/order/whatsapp";

const STEP_LABELS = ["What & where", "Who & when", "Review"];
const TOTAL_STEPS = STEP_LABELS.length;

interface OrderFormProps {
  /**
   * Mirrors the dialog's open state. OrderForm stays mounted across opens
   * (see OrderDialogProvider) so the dialog's exit animation has real
   * content to animate — this prop just tells us when to reset internal
   * state back to a clean slate, shortly after the close transition ends.
   */
  dialogOpen: boolean;
}

export function OrderForm({ dialogOpen }: OrderFormProps) {
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState<"form" | "success">("form");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: ORDER_FORM_DEFAULTS,
    mode: "onTouched",
  });

  const { trigger, handleSubmit, reset } = form;

  // Reset once the dialog has fully closed (after its ~200-300ms exit
  // transition), so the content doesn't visibly clear itself mid-animation,
  // but the next open still starts from a clean slate.
  useEffect(() => {
    if (!dialogOpen) {
      const timeout = setTimeout(() => {
        reset(ORDER_FORM_DEFAULTS);
        setStep(0);
        setStage("form");
        setWhatsappUrl("");
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [dialogOpen, reset]);

  const onSubmit = (values: OrderFormValues) => {
    const message = buildWhatsAppMessage(values);
    const url = buildWhatsAppUrl(message);
    // Opened synchronously within the submit click's event handler stack so
    // browsers treat it as a direct user-initiated action, not a blocked popup.
    window.open(url, "_blank", "noopener,noreferrer");
    setWhatsappUrl(url);
    setStage("success");
  };

  const handleNext = async () => {
    const fields = STEP_FIELDS[step as keyof typeof STEP_FIELDS];
    const valid = await trigger(fields);
    if (valid) setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  if (stage === "success") {
    return <SuccessScreen whatsappUrl={whatsappUrl} />;
  }

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-6">
        <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} labels={STEP_LABELS} />

        <form
          onSubmit={step === TOTAL_STEPS - 1 ? handleSubmit(onSubmit) : (e) => e.preventDefault()}
          noValidate
        >
          {step === 0 && <ServiceStep />}
          {step === 1 && <CustomerStep />}
          {step === 2 && <ReviewStep />}

          <div className="mt-6 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              disabled={step === 0}
            >
              Back
            </Button>

            {step < TOTAL_STEPS - 1 ? (
              <Button
                type="button"
                variant="primary"
                icon={<ArrowIcon className="h-4 w-4" />}
                onClick={handleNext}
              >
                Continue
              </Button>
            ) : (
              <Button type="submit" variant="primary" icon={<ArrowIcon className="h-4 w-4" />}>
                Send on WhatsApp
              </Button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
