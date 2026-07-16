"use client";

import { Accordion } from "@base-ui/react/accordion";
import { m } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Label } from "@/components/ui/Text";
import { faqItems } from "@/content/faq";
import { fadeInUp, scrollRevealViewport } from "@/lib/motion";
import { cn } from "@/utils/cn";

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Faq() {
  return (
    <Section id="faq" tone="paper">
      <Container size="narrow">
        <div className="text-center">
          <Label tone="amber">Questions</Label>
          <Heading level={2} className="mt-4">
            FAQ
          </Heading>
        </div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealViewport}
          variants={fadeInUp}
          className="mt-10"
        >
          <Accordion.Root className="flex flex-col divide-y divide-ink-teal/10 border-t border-b border-ink-teal/10">
            {faqItems.map((item) => (
              <Accordion.Item key={item.question}>
                <Accordion.Header>
                  <Accordion.Trigger
                    className={cn(
                      "group flex w-full items-center justify-between gap-4 py-5 text-left",
                      "font-sans text-base font-medium text-ink-teal",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-teal/60 rounded-sm",
                    )}
                  >
                    {item.question}
                    <PlusIcon className="h-4 w-4 shrink-0 text-amber-deep transition-transform duration-200 ease-out group-data-panel-open:rotate-45" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Panel
                  className={cn(
                    "h-(--accordion-panel-height) overflow-hidden",
                    "transition-[height] duration-200 ease-out",
                    "data-starting-style:h-0 data-ending-style:h-0",
                  )}
                >
                  <p className="pb-5 font-sans text-sm text-ink-teal/70 max-w-xl">{item.answer}</p>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </m.div>
      </Container>
    </Section>
  );
}
