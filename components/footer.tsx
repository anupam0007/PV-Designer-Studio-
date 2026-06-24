import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/social-icons";
import { getContactSettings } from "@/lib/site-settings-data";
import { locations } from "@/data/locations";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export async function Footer() {
  const contact = await getContactSettings();
  const whatsappLink = buildWhatsAppLink(
    "Hello PV Designer Studio, I'm interested in your collections!",
    contact.whatsappNumber
  );

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          {/* Brand + About */}
          <div className="space-y-4">
            <Image
              src="/images/logo.png"
              alt="PV Designer Studio"
              width={170}
              height={44}
              className="h-11 w-auto"
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Bespoke, handcrafted bridal lehengas, designer gowns and bridal blouses —
              customized to you, with worldwide delivery and virtual consultations.{" "}
              <span className="italic">Customize Your Charm.</span>
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

          {/* Studio Locations */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 font-heading text-base font-semibold uppercase tracking-wide text-primary">
              Our Studios
            </h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {locations.map((loc) => (
                <div key={loc.id} className="text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">
                        {loc.name.split("—")[1]?.trim() ?? loc.name}
                      </p>
                      <p className="mt-0.5 text-muted-foreground">{loc.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-heading text-base font-semibold uppercase tracking-wide text-primary">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              {contact.phones.map((p) => (
                <li key={p.number} className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{p.label}</p>
                    <a
                      href={`tel:${p.number.replace(/\s+/g, "")}`}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      {p.number}
                    </a>
                  </div>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {contact.email}
                </a>
              </li>
              <li>
                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  WhatsApp Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 border-t border-border py-5 text-center text-sm text-muted-foreground sm:flex-row sm:gap-4">
        <span>© {new Date().getFullYear()} PV Designer Studio. All rights reserved.</span>
        <Link
          href="/admin/login"
          className="text-xs text-muted-foreground/50 transition-colors hover:text-primary"
        >
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
