"use client";

import { m } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text, Label } from "@/components/ui/Text";
import { howItWorksSteps } from "@/content/how-it-works";
import { fadeInUp, staggerContainer, scrollRevealViewport } from "@/lib/motion";

export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="ink">
      <Container>
        <div className="max-w-2xl">
          <Label tone="sage" surface="onDark">The Process</Label>
          <Heading level={2} className="mt-4 text-paper">
            How It Works
          </Heading>
          <Text size="lg" className="mt-4 text-paper/75">
            Four steps, start to finish. No app to download, no account to create.
          </Text>
        </div>

        <m.ol
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealViewport}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
        >
          {howItWorksSteps.map((step) => (
            <m.li key={step.number} variants={fadeInUp} className="flex flex-col gap-3">
              <span className="font-display text-3xl font-bold text-sage">{step.number}</span>
              <Heading level={4} size={4} as="h3" className="text-paper">
                {step.title}
              </Heading>
              <Text size="sm" className="text-paper/70">
                {step.description}
              </Text>
            </m.li>
          ))}
        </m.ol>
      </Container>
    </Section>
  );
}
