"use client";

import { m } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text, Label } from "@/components/ui/Text";
import { trustPoints } from "@/content/trust-points";
import { fadeInUp, staggerContainer, scrollRevealViewport } from "@/lib/motion";

export function WhyFrankieRuns() {
  return (
    <Section tone="paper">
      <Container>
        <div className="max-w-2xl">
          <Label tone="amber">Why Frankie Runs</Label>
          <Heading level={2} className="mt-4">
            A person, not a platform
          </Heading>
        </div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealViewport}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-10"
        >
          {trustPoints.map((point, i) => (
            <m.div key={point.title} variants={fadeInUp} className="border-t border-ink-teal/15 pt-5">
              <span className="font-mono text-xs text-amber-deep">{String(i + 1).padStart(2, "0")}</span>
              <Heading level={4} size={4} as="h3" className="mt-2">
                {point.title}
              </Heading>
              <Text size="sm" muted className="mt-2">
                {point.description}
              </Text>
            </m.div>
          ))}
        </m.div>
      </Container>
    </Section>
  );
}
