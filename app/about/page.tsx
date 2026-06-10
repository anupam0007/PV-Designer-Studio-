import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hand, Sparkles, Star, Users, Video } from "lucide-react";
import { InstagramIcon } from "@/components/social-icons";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getContactSettings, buildContactWhatsAppLink } from "@/lib/site-settings-data";

export const metadata: Metadata = {
  title: "About Us | PV Designer Studio",
  description:
    "Meet Chitra Murugaiyan, founder of PV Designer Studio — a Bangalore-based couture boutique specializing in bespoke, handcrafted ethnic wear with worldwide delivery.",
};

const stats = [
  { icon: InstagramIcon, value: "188K+", label: "Instagram Followers" },
  { icon: Star, value: "700+", label: "Google Reviews" },
  { icon: Users, value: "20 Lakh+", label: "Customers Served" },
  { icon: Hand, value: "100%", label: "Artisan Supported" },
];

const process = [
  {
    title: "1. Consult",
    description:
      "Connect with our design team in-studio or via a virtual video call to discuss your vision, occasion and budget.",
  },
  {
    title: "2. Customize",
    description:
      "Choose your fabric, colours, embroidery and silhouette. Our designers will guide you to the perfect fit.",
  },
  {
    title: "3. Measure",
    description:
      "Share your measurements using our size chart, or book a virtual measurement session for accuracy.",
  },
  {
    title: "4. Craft & Deliver",
    description:
      "Our artisans handcraft your outfit with care, and we deliver it to your doorstep — anywhere in the world.",
  },
];

const brands = [
  {
    name: "PV Bridals",
    description: "Our flagship bridal label — exquisite lehengas, blouses and gowns for the modern Indian bride.",
  },
  {
    name: "Nayakii",
    description: "Ready-made festive and party wear designed for everyday elegance, without the wait.",
  },
  {
    name: "PV Rentals",
    description: "Rent statement pieces for weddings and events — luxury fashion, made accessible.",
  },
];

export default async function AboutPage() {
  const contact = await getContactSettings();
  const whatsappLink = buildContactWhatsAppLink(contact);

  return (
    <div>
      {/* Founder story */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div className="img-zoom relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
          <Image
            src="/images/extra/extra-3.jpg"
            alt="A handcrafted PV Designer Studio bridal creation"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Our Story
          </span>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
            Meet Chitra Murugaiyan
          </h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            PV Designer Studio was founded by Chitra Murugaiyan, a couture designer
            based in Bangalore with a passion for celebrating Indian craftsmanship
            through contemporary silhouettes. What began as a small atelier has grown
            into a beloved name in bespoke bridal and festive wear — trusted by
            thousands of families for weddings, receptions and milestone celebrations.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Every PV Designer Studio creation is handcrafted by skilled artisans,
            blending traditional techniques like aari and zardozi embroidery with
            modern cuts and finishes. Our philosophy is simple: your outfit should be
            as unique as you are — which is why every piece is customized to your
            measurements, preferences and story.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/shop">Explore Our Collections</Link>
          </Button>
        </div>
      </section>

      {/* Trust stats */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <stat.icon className="h-6 w-6" />
              </div>
              <p className="font-heading text-2xl font-semibold sm:text-3xl">{stat.value}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customization process */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Bespoke, From Start to Finish"
          title="Our Customization & Virtual Consultation Process"
          subtitle="No matter where you are in the world, we make bespoke ethnic wear simple and personal."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step) => (
            <Card key={step.title}>
              <CardContent className="p-6">
                <h3 className="font-heading text-lg font-semibold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl bg-secondary/50 p-8 text-center">
          <Video className="h-8 w-8 text-primary" />
          <h3 className="font-heading text-xl font-semibold">Book a Virtual Consultation</h3>
          <p className="max-w-xl text-sm text-muted-foreground">
            Can&apos;t visit us in person? Schedule a video call with our design team —
            we&apos;ll walk you through fabrics, designs and measurements from the
            comfort of your home.
          </p>
          <Button asChild>
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Book via WhatsApp
            </Link>
          </Button>
        </div>
      </section>

      {/* Our brands */}
      <section className="bg-secondary/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="One Family, Three Labels"
            title="Our Brands"
            subtitle="Whichever way you shop, every PV Designer Studio brand promises handcrafted quality."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {brands.map((brand) => (
              <Card key={brand.name} className="text-center">
                <CardContent className="flex flex-col items-center gap-3 p-8">
                  <Sparkles className="h-8 w-8 text-accent" />
                  <h3 className="font-heading text-xl font-semibold">{brand.name}</h3>
                  <p className="text-sm text-muted-foreground">{brand.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
