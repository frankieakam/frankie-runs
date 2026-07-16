import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Text } from "@/components/ui/Text";
import { IconButton } from "@/components/ui/IconButton";
import { PhoneIcon } from "@/constants/icons";
import { FacebookIcon, InstagramIcon, XIcon } from "@/constants/social-icons";
import { businessConfig } from "@/config/business";
import { navLinks } from "@/content/nav-links";
import { FooterWhatsAppButton } from "@/features/navigation/FooterWhatsAppButton";

export function Footer() {
  const year = new Date().getFullYear();
  const { social } = businessConfig;

  return (
    <footer id="footer" className="bg-ink-teal text-paper">
      <Container className="py-14 sm:py-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-4 max-w-xs">
            <Logo theme="light" />
            <Text size="sm" className="text-paper/70">
              {businessConfig.tagline}
            </Text>
          </div>

          <nav className="flex flex-col gap-2">
            <Text size="sm" className="text-paper/50 font-mono uppercase tracking-wide mb-1">
              Site
            </Text>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-paper/80 hover:text-paper transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <Text size="sm" className="text-paper/50 font-mono uppercase tracking-wide mb-1">
              Contact
            </Text>
            <div className="flex items-center gap-2 text-paper/80">
              <PhoneIcon className="h-4 w-4" aria-hidden />
              <span className="font-mono text-sm">{businessConfig.contact.whatsappNumber}</span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <FooterWhatsAppButton />
              {social.facebook && (
                <IconButton
                  aria-label="Frankie Runs on Facebook"
                  variant="ghost"
                  size="sm"
                  className="text-paper hover:bg-paper/10"
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon className="h-4 w-4" />
                </IconButton>
              )}
              {social.instagram && (
                <IconButton
                  aria-label="Frankie Runs on Instagram"
                  variant="ghost"
                  size="sm"
                  className="text-paper hover:bg-paper/10"
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon className="h-4 w-4" />
                </IconButton>
              )}
              {social.x && (
                <IconButton
                  aria-label="Frankie Runs on X"
                  variant="ghost"
                  size="sm"
                  className="text-paper hover:bg-paper/10"
                  href={social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <XIcon className="h-4 w-4" />
                </IconButton>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-paper/10 flex flex-col sm:flex-row sm:justify-between gap-2">
          <Text size="sm" className="text-paper/50">
            &copy; {year} {businessConfig.name}. All rights reserved.
          </Text>
          <Text size="sm" className="text-paper/50 font-mono">
            {businessConfig.serviceArea.city}, {businessConfig.serviceArea.state}
          </Text>
        </div>
      </Container>
    </footer>
  );
}
