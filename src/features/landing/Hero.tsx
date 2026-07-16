"use client";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text, Label } from "@/components/ui/Text";
import { Button, ButtonLink } from "@/components/ui/Button";
import { RouteMotif } from "@/components/ui/RouteMotif";
import { ArrowIcon } from "@/constants/icons";
import { businessConfig, getSubTaglineWithCity } from "@/config/business";
import { useOrderDialog } from "@/features/order/OrderDialogProvider";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { m } from "framer-motion";

export function Hero() {
  const { openOrderDialog } = useOrderDialog();

  return (
    <section className="relative overflow-hidden bg-paper pt-36 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-32">
      {/* Desktop: large decorative motif pinned to the right edge, independent of the text column */}
      <div
        className="hidden lg:block absolute right-[6%] top-0 h-full w-24 xl:w-28"
        aria-hidden
      >
        <RouteMotif surface="onLight" />
      </div>

      <Container>
        <m.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center text-center lg:items-start lg:text-left lg:max-w-2xl"
        >
          {/* Mobile: compact motif above the headline, centered */}
          <m.div variants={fadeInUp} className="mb-6 h-24 w-10 lg:hidden">
            <RouteMotif surface="onLight" />
          </m.div>

          <m.div variants={fadeInUp}>
            <Label tone="sage">
              Now delivering in {businessConfig.serviceArea.city}
            </Label>
          </m.div>

          <m.div variants={fadeInUp}>
            <Heading level={1} className="mt-4">
              {businessConfig.tagline}
            </Heading>
          </m.div>

          <m.div variants={fadeInUp}>
            <Text size="lg" muted className="mt-5 max-w-md lg:max-w-lg">
              Food, packages, market runs, documents — if it&apos;s somewhere in{" "}
              {businessConfig.serviceArea.city}, I&apos;ll go get it and bring it straight to your
              door. Just me, just WhatsApp.
            </Text>
          </m.div>

          <m.div variants={fadeInUp} className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowIcon className="h-5 w-5" />}
              onClick={openOrderDialog}
            >
              Send a request
            </Button>
            <ButtonLink href="#how-it-works" variant="secondary" size="lg">
              See how it works
            </ButtonLink>
          </m.div>

          <m.div variants={fadeInUp}>
            <Text size="sm" muted className="mt-6 font-mono uppercase tracking-wide">
              {getSubTaglineWithCity()}
            </Text>
          </m.div>
        </m.div>
      </Container>
    </section>
  );
}
