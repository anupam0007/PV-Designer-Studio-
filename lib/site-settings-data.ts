import { contact as staticContact, socials as staticSocials } from "@/data/locations";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export interface HeroSlide {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export const defaultHeroSlides: HeroSlide[] = [
  {
    image: "/images/extra/extra-1.jpg",
    eyebrow: "PV Designer Studio",
    title: "Customize Your Charm",
    description:
      "Bespoke, handcrafted bridal lehengas, gowns and blouses — made just for you.",
    ctaLabel: "Shop Collections",
    ctaHref: "/shop",
  },
  {
    image: "/images/cat-indo-western.jpg",
    eyebrow: "Indo-Western Collections",
    title: "A Perfect Blend of Tradition & Modernity",
    description: "Contemporary silhouettes inspired by timeless Indian craftsmanship.",
    ctaLabel: "Shop Collections",
    ctaHref: "/shop/indo-western",
  },
  {
    image: "/images/products/hibiscus-charm-1.jpg",
    eyebrow: "Bridal Blouses & Gowns",
    title: "Handcrafted, Just for You",
    description: "Aari-work and zardozi blouses tailored to your exact measurements.",
    ctaLabel: "Explore Outfits",
    ctaHref: "/shop/blouses",
  },
];

export interface ContactSettings {
  email: string;
  whatsappNumber: string;
  phones: { label: string; number: string }[];
  instagram: string;
  facebook: string;
  youtube: string;
}

export const defaultContactSettings: ContactSettings = {
  email: staticContact.email,
  whatsappNumber: staticContact.whatsappNumber,
  phones: staticContact.phones,
  instagram: staticSocials.instagram,
  facebook: staticSocials.facebook,
  youtube: staticSocials.youtube,
};

async function getSetting<T>(key: string): Promise<T | undefined> {
  if (!isSupabaseConfigured) return undefined;

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();

  if (error || !data?.value) return undefined;
  return data.value as T;
}

/** Home page hero carousel slides — from Supabase if configured, otherwise the bundled defaults. */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  const value = await getSetting<HeroSlide[]>("hero");
  return value && value.length > 0 ? value : defaultHeroSlides;
}

/** Contact details, phone numbers and social links — from Supabase if configured. */
export async function getContactSettings(): Promise<ContactSettings> {
  const value = await getSetting<ContactSettings>("contact");
  return value ?? defaultContactSettings;
}

/** Builds the WhatsApp link shown in the footer/contact page from the configured number. */
export function buildContactWhatsAppLink(contactSettings: ContactSettings): string {
  return buildWhatsAppLink(
    "Hello PV Designer Studio, I'm interested in your collections!",
    contactSettings.whatsappNumber
  );
}
