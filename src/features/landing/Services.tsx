"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text, Label } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { services } from "@/content/services";
import { fadeInUp, staggerContainer, scrollRevealViewport } from "@/lib/motion";

export function Services() {
  return (
    <Section id="services" tone="paper">
      <Container>
        <div className="max-w-2xl">
          <Label tone="amber">What I Can Get For You</Label>
          <Heading level={2} className="mt-4">
            Services
          </Heading>
          <Text size="lg" muted className="mt-4">
            Six ways to hand something off to me instead of doing it yourself.
          </Text>
        </div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealViewport}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <m.div key={service.slug} variants={fadeInUp}>
              <Card interactive className="h-full flex flex-col">
                <div className="relative aspect-4/3 w-full bg-ink-teal/5">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    loading="eager"
                    
                  />
                </div>
                <div className="flex flex-col gap-2 p-6">
                  <service.icon className="h-5 w-5 text-amber-deep" />
                  <Heading level={4} size={4} as="h3">
                    {service.title}
                  </Heading>
                  <Text size="sm" muted>
                    {service.description}
                  </Text>
                </div>
              </Card>
            </m.div>
          ))}
        </m.div>
      </Container>
    </Section>
  );
}
