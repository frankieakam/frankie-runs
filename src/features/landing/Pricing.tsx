"use client";

import { m } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text, Label } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/constants/icons";
import { businessConfig } from "@/config/business";
import { useOrderDialog } from "@/features/order/OrderDialogProvider";
import { fadeInUp, scrollRevealViewport } from "@/lib/motion";

export function Pricing() {
  const { openOrderDialog } = useOrderDialog();

  return (
    <Section id="pricing" tone="paper">
      <Container size="narrow">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealViewport}
          variants={fadeInUp}
          className="rounded-2xl bg-ink-teal px-8 py-10 sm:px-12 sm:py-14 text-center flex flex-col items-center"
        >
          <Label tone="sage" surface="onDark">Delivery Pricing</Label>
          <Heading level={2} className="mt-4 text-paper">
            From {businessConfig.pricing.startingFrom}
          </Heading>
          <Text size="md" className="mt-4 max-w-md text-paper/75">
            {businessConfig.pricing.note}
          </Text>
          <div className="mt-8">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowIcon className="h-5 w-5" />}
              onClick={openOrderDialog}
            >
              Get a price on WhatsApp
            </Button>
          </div>
        </m.div>
      </Container>
    </Section>
  );
}
