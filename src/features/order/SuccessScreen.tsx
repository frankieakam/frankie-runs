"use client";

import { CheckIcon, ArrowIcon } from "@/constants/icons";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ButtonLink } from "@/components/ui/Button";

interface SuccessScreenProps {
  whatsappUrl: string;
}

export function SuccessScreen({ whatsappUrl }: SuccessScreenProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sage/25">
        <CheckIcon className="h-7 w-7 text-ink-teal" aria-hidden />
      </div>

      <Heading level={3}>Almost there!</Heading>

      <Text size="sm" muted className="max-w-xs">
        WhatsApp should be opening now with your request ready to send. If nothing happened,
        use the button below.
      </Text>

      <ButtonLink
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        variant="primary"
        size="lg"
        icon={<ArrowIcon className="h-5 w-5" />}
        className="mt-2"
      >
        Open WhatsApp
      </ButtonLink>
    </div>
  );
}
