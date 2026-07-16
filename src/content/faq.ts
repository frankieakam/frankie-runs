export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "How do I place a request?",
    answer:
      "Tap any \"Send a request\" button on this site. It opens a short form, then generates a ready-to-send WhatsApp message so nothing gets lost in translation.",
  },
  {
    question: "How do I pay?",
    answer: "By bank transfer, completed before delivery. Account details are shared with you on WhatsApp once your request is confirmed.",
  },
  {
    question: "How much does delivery cost?",
    answer:
      "Pricing starts from ₦500 and depends on distance and what's involved. You'll always get a clear price on WhatsApp before I head out.",
  },
  {
    question: "What areas do you cover?",
    answer: "Right now, anywhere within Uyo. If you're not sure your location is covered, just ask on WhatsApp.",
  },
  {
    question: "What can you deliver?",
    answer:
      "Food, groceries, parcels, documents, market runs, or pretty much any errand in Uyo. If it's unusual, just describe it and I'll let you know.",
  },
  {
    question: "How fast is delivery?",
    answer: "Most requests are picked up and delivered the same day, often within a couple of hours depending on how busy things are.",
  },
];
