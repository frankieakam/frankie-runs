import { services } from "@/content/services";
import { businessConfig } from "@/config/business";
import type { OrderFormValues } from "@/features/order/schema";

function serviceTitle(slug: string): string {
  return services.find((s) => s.slug === slug)?.title ?? slug;
}

/**
 * Builds the exact message text sent to Frankie on WhatsApp. Keep this in
 * plain, warm language — this is Frankie's voice reaching a customer, not
 * a system-generated ticket.
 */
export function buildWhatsAppMessage(values: OrderFormValues): string {
  const lines = [
    "Hi Frankie, I'd like to send a request from the website.",
    "",
    `Customer: ${values.customerName}`,
    `Phone: ${values.phone}`,
    `Service: ${serviceTitle(values.service)}`,
    `Pickup: ${values.pickup}`,
    `Delivery: ${values.delivery}`,
    `Description: ${values.description}`,
    `Preferred Time: ${values.preferredTime}`,
  ];

  if (values.notes && values.notes.trim().length > 0) {
    lines.push(`Notes: ${values.notes.trim()}`);
  }

  lines.push("", `Payment: ${businessConfig.payment.displayLine}`);

  return lines.join("\n");
}

/** Builds the wa.me deep link with the message pre-filled and URL-encoded. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${businessConfig.contact.whatsappNumberIntl}?text=${encodeURIComponent(message)}`;
}
