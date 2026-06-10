import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/social-icons";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { StudioLocations } from "@/components/studio-locations";
import { getAllLocations } from "@/lib/locations-data";
import { getContactSettings, buildContactWhatsAppLink } from "@/lib/site-settings-data";

export const metadata: Metadata = {
  title: "Contact Us | PV Designer Studio",
  description:
    "Get in touch with PV Designer Studio — visit our Bangalore studios, call us, or chat on WhatsApp for bespoke bridal and festive wear enquiries.",
};

export default async function ContactPage() {
  const [locations, contact] = await Promise.all([getAllLocations(), getContactSettings()]);
  const whatsappLink = buildContactWhatsAppLink(contact);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold sm:text-4xl">Contact Us</h1>
        <p className="mt-2 text-muted-foreground">
          We&apos;d love to help you create your perfect outfit. Reach out anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 font-heading text-xl font-semibold">Send us a message</h2>
          <ContactForm />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h2 className="mb-4 font-heading text-xl font-semibold">Reach us directly</h2>
            <ul className="space-y-3 text-sm">
              {contact.phones.map((phone) => (
                <li key={phone.number} className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <span className="font-medium">{phone.label}:</span>{" "}
                    <a href={`tel:${phone.number.replace(/\s/g, "")}`} className="hover:text-primary">
                      {phone.number}
                    </a>
                  </span>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${contact.email}`} className="hover:text-primary">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-heading text-xl font-semibold">Connect with us</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </Link>
              <Link
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary"
              >
                <InstagramIcon className="h-4 w-4" /> Instagram
              </Link>
              <Link
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary"
              >
                <FacebookIcon className="h-4 w-4" /> Facebook
              </Link>
              <Link
                href={contact.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary"
              >
                <YoutubeIcon className="h-4 w-4" /> YouTube
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading
          align="left"
          eyebrow="Visit Us"
          title="Our Studios"
          subtitle="Walk in for a personal consultation at any of our Bangalore studios."
        />
        <StudioLocations locations={locations} />
      </div>
    </div>
  );
}
