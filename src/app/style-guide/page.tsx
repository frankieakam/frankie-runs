"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text, Label } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Logo } from "@/components/ui/Logo";
import { IconMark } from "@/components/ui/IconMark";
import { RouteMotif } from "@/components/ui/RouteMotif";
import { ResponsiveDialog } from "@/components/ui/ResponsiveDialog";
import {
  ArrowIcon,
  PhoneIcon,
  MapPinIcon,
  PackageIcon,
  ClockIcon,
  CheckIcon,
  TruckIcon,
  ShoppingBagIcon,
  MenuIcon,
  CloseIcon,
} from "@/constants/icons";
import { WhatsAppIcon, FacebookIcon, InstagramIcon, XIcon } from "@/constants/social-icons";

const ICONS = [
  { Icon: MenuIcon, name: "Menu" },
  { Icon: CloseIcon, name: "Close" },
  { Icon: ArrowIcon, name: "Arrow" },
  { Icon: PhoneIcon, name: "Phone" },
  { Icon: MapPinIcon, name: "MapPin" },
  { Icon: PackageIcon, name: "Package" },
  { Icon: ClockIcon, name: "Clock" },
  { Icon: CheckIcon, name: "Check" },
  { Icon: TruckIcon, name: "Truck" },
  { Icon: ShoppingBagIcon, name: "ShoppingBag" },
];

const BRAND_ICONS = [
  { Icon: WhatsAppIcon, name: "WhatsApp" },
  { Icon: FacebookIcon, name: "Facebook" },
  { Icon: InstagramIcon, name: "Instagram" },
  { Icon: XIcon, name: "X" },
];

export default function StyleGuidePage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <main>
      {/* Logo lockup */}
      <Section tone="paper">
        <Container className="flex flex-col gap-8">
          <Label tone="amber">Design System</Label>
          <Logo />
        </Container>
      </Section>

      {/* Color swatches */}
      <Section tone="paper" compact>
        <Container className="flex flex-col gap-4">
          <Heading level={3}>Color System</Heading>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
            {[
              { name: "Ink Teal", className: "bg-ink-teal" },
              { name: "Ink Soft", className: "bg-ink-soft" },
              { name: "Amber", className: "bg-amber" },
              { name: "Amber Soft", className: "bg-amber-soft" },
              { name: "Sage", className: "bg-sage" },
              { name: "Paper", className: "bg-paper border border-ink-teal/10" },
            ].map((c) => (
              <div key={c.name} className="flex flex-col gap-2">
                <div className={`h-16 rounded-lg ${c.className}`} />
                <Text size="sm">{c.name}</Text>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Typography */}
      <Section tone="paper" compact>
        <Container className="flex flex-col gap-4">
          <Heading level={3}>Typography</Heading>
          <Heading level={1}>Heading 1 Fraunces Black</Heading>
          <Heading level={2}>Heading 2 Fraunces Black</Heading>
          <Heading level={3}>Heading 3 Fraunces Bold</Heading>
          <Heading level={4}>Heading 4 Fraunces Bold</Heading>
          <Text size="lg">Body large — Inter, for supporting hero copy.</Text>
          <Text size="md">Body medium — Inter, the default paragraph size.</Text>
          <Text size="sm" muted>
            Body small, muted — Inter, for secondary detail text.
          </Text>
          <Label tone="sage">Mono label · JetBrains Mono</Label>
        </Container>
      </Section>

      {/* Buttons */}
      <Section tone="paper" compact>
        <Container className="flex flex-col gap-4">
          <Heading level={3}>Buttons</Heading>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" icon={<ArrowIcon className="h-4 w-4" />}>
              Send a request
            </Button>
            <Button variant="secondary">Learn more</Button>
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <IconButton aria-label="Open menu" variant="solid">
              <MenuIcon className="h-5 w-5" />
            </IconButton>
          </div>
        </Container>
      </Section>

      {/* Cards */}
      <Section tone="paper" compact>
        <Container className="flex flex-col gap-4">
          <Heading level={3}>Cards</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["Food Delivery", "Grocery Runs", "Parcel Delivery"].map((s) => (
              <Card key={s} interactive className="p-6">
                <PackageIcon className="h-6 w-6 text-amber-deep mb-3" />
                <Heading level={4} size={4}>
                  {s}
                </Heading>
                <Text size="sm" muted className="mt-1">
                  Sample service card content for visual verification.
                </Text>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Form fields */}
      <Section tone="paper" compact>
        <Container size="narrow" className="flex flex-col gap-4">
          <Heading level={3}>Form Fields</Heading>
          <Select
            label="Service"
            placeholder="Choose a service"
            options={[
              { label: "Food Delivery", value: "food" },
              { label: "Grocery Runs", value: "grocery" },
              { label: "Parcel Delivery", value: "parcel" },
            ]}
          />
          <Input label="Full name" placeholder="e.g. Frankie Akam" />
          <Input label="With error" placeholder="e.g. 08012345678" error="Enter a valid phone number." />
          <Textarea label="Notes" placeholder="Anything Frankie should know before pickup" />
        </Container>
      </Section>

      {/* Route motif */}
      <Section tone="ink" compact>
        <Container className="flex flex-col gap-6 items-center text-center">
          <Heading level={3} className="text-paper">
            Route Motif
          </Heading>
          <div className="h-40 w-16">
            <RouteMotif surface="onDark" />
          </div>
          <div className="h-24 w-24">
            <IconMark />
          </div>
        </Container>
      </Section>

      {/* Responsive dialog */}
      <Section tone="paper" compact>
        <Container className="flex flex-col gap-4">
          <Heading level={3}>Responsive Dialog</Heading>
          <Text size="sm" muted>
            Renders as a centered modal on desktop, a swipe-to-dismiss bottom sheet on mobile.
          </Text>
          <Button onClick={() => setDialogOpen(true)} className="self-start">
            Open dialog
          </Button>
          <ResponsiveDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            title="Send a request"
            description="Tell Frankie what you need."
          >
            <Text size="sm">Dialog content placeholder — the real order form arrives in a later step.</Text>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </ResponsiveDialog>
        </Container>
      </Section>

      {/* Brand icons */}
      <Section tone="paper" compact>
        <Container className="flex flex-col gap-4">
          <Heading level={3}>Icon Sets</Heading>
          <div className="flex flex-wrap gap-6">
            {ICONS.map(({ Icon, name }) => (
              <div key={name} className="flex flex-col items-center gap-1">
                <Icon className="h-5 w-5" />
                <Text size="sm" muted>
                  {name}
                </Text>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-6">
            {BRAND_ICONS.map(({ Icon, name }) => (
              <div key={name} className="flex flex-col items-center gap-1">
                <Icon className="h-5 w-5" />
                <Text size="sm" muted>
                  {name}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
