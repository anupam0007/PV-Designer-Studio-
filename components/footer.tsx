import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/social-icons";
import { getContactSettings, buildContactWhatsAppLink } from "@/lib/site-settings-data";

const collections = [
  { label: "Gowns", href: "/shop/gowns" },
  { label: "Lehengas", href: "/shop/lehengas" },
  { label: "Bridal Blouse", href: "/shop/blouses" },
  { label: "Indo-Western", href: "/shop/indo-western" },
  { label: "Men's", href: "/shop/men" },
];

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Size Chart", href: "/size-chart" },
  { label: "Contact", href: "/contact" },
];

export async function Footer() {
  const contact = await getContactSettings();
  const whatsappLink = buildContactWhatsAppLink(contact);

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div className="space-y-4">
          <Image
            src="/images/logo.png"
            alt="PV Designer Studio"
            width={170}
            height={44}
            className="h-11 w-auto"
          />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Bespoke, handcrafted bridal lehengas, designer gowns and bridal
            blouses — customized to you, with worldwide delivery and virtual
            consultations. <span className="italic">Customize Your Charm.</span>
          </p>
          <div className="flex gap-3">
            <SocialIcon href={contact.instagram} label="Instagram">
              <InstagramIcon className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href={contact.facebook} label="Facebook">
              <FacebookIcon className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href={contact.youtube} label="YouTube">
              <YoutubeIcon className="h-4 w-4" />
            </SocialIcon>
          </div>
        </div>

        {/* Collections */}
        <div>
          <h3 className="mb-4 font-heading text-lg font-semibold text-primary">
            Our Collections
          </h3>
          <ul className="space-y-2 text-sm">
            {collections.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-4 font-heading text-lg font-semibold text-primary">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick help */}
        <div>
          <h3 className="mb-4 font-heading text-lg font-semibold text-primary">
            Quick Help
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" /> {contact.email}
              </a>
            </li>
            <li>
              <Link
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <InstagramIcon className="h-4 w-4" /> Chat on Instagram
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 border-t border-border py-5 text-center text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-3">
        <span>© {new Date().getFullYear()} PV Designer Studio. All rights reserved.</span>
        <Link href="/admin/login" className="text-xs text-muted-foreground/60 transition-colors hover:text-primary">
          Admin
        </Link>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {children}
    </Link>
  );
}
