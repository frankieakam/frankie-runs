export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: "01",
    title: "Message Frankie",
    description: "Send what you need on WhatsApp — the service, where it's coming from, and where it's going.",
  },
  {
    number: "02",
    title: "Frankie picks it up",
    description: "I head there myself, collect it, and confirm the details with you before I move.",
  },
  {
    number: "03",
    title: "Pay by transfer",
    description: "Send payment via bank transfer before delivery. Simple, no cash handling on pickup.",
  },
  {
    number: "04",
    title: "Delivered to your door",
    description: "Straight to you, same day. No app to track, no fleet — just a text when I'm close.",
  },
];
