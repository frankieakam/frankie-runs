"use client";

import { m } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { RouteMotif } from "@/components/ui/RouteMotif";
import { ArrowIcon } from "@/constants/icons";
import { businessConfig } from "@/config/business";
import { useOrderDialog } from "@/features/order/OrderDialogProvider";
import { fadeInUp, scrollRevealViewport } from "@/lib/motion";

export function FinalCta() {
  const { openOrderDialog } = useOrderDialog();

  return (
    <Section tone="ink" compact className="relative overflow-hidden">
      <div className="hidden md:block absolute left-[8%] top-0 h-full w-16" aria-hidden>
        <RouteMotif surface="onDark" />
      </div>
      <Container size="narrow">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealViewport}
          variants={fadeInUp}
          className="text-center flex flex-col items-center"
        >
          <Heading level={2} className="text-paper">
            {businessConfig.tagline}
          </Heading>
          <Text size="lg" className="mt-4 max-w-md text-paper/75">
            Whatever it is, message me and I&apos;ll go get it.
          </Text>
          <div className="mt-8">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowIcon className="h-5 w-5" />}
              onClick={openOrderDialog}
            >
              Send a request
            </Button>
          </div>
        </m.div>
      </Container>
    </Section>
  );
}
