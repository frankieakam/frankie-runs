import { z } from "zod";
import { services } from "@/content/services";

const serviceSlugs = services.map((s) => s.slug) as [string, ...string[]];

export const orderFormSchema = z.object({
  // Step 1 — what & where
  service: z.enum(serviceSlugs, {
    message: "Choose the service that fits what you need.",
  }),
  pickup: z
    .string()
    .trim()
    .min(3, "Let me know where I'm picking this up from."),
  delivery: z
    .string()
    .trim()
    .min(3, "Let me know where this is going."),
  description: z
    .string()
    .trim()
    .min(5, "Add a short description so I know what to expect."),

  // Step 2 — who & when
  customerName: z.string().trim().min(2, "Enter your full name."),
  phone: z
    .string()
    .trim()
    .regex(/^(0\d{10}|\+234\d{10})$/, "Enter a valid Nigerian phone number, e.g. 08012345678."),
  preferredTime: z
    .string()
    .trim()
    .min(2, "Let me know when works best, even just \u201Cas soon as possible\u201D."),
  notes: z.string().trim().optional(),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;

/** Field groups used to validate only the current step before advancing. */
export const STEP_FIELDS = {
  0: ["service", "pickup", "delivery", "description"],
  1: ["customerName", "phone", "preferredTime", "notes"],
} as const satisfies Record<number, (keyof OrderFormValues)[]>;

export const ORDER_FORM_DEFAULTS: OrderFormValues = {
  service: services[0].slug,
  pickup: "",
  delivery: "",
  description: "",
  customerName: "",
  phone: "",
  preferredTime: "",
  notes: "",
};
