import { Globe, Hand, Headset, Sparkles } from "lucide-react";

const badges = [
  {
    icon: Globe,
    title: "Worldwide Delivery",
    description: "We ship our handcrafted creations anywhere in the world.",
  },
  {
    icon: Hand,
    title: "Supporting Artisans",
    description: "Every order helps sustain local craftsmen and their heritage.",
  },
  {
    icon: Sparkles,
    title: "Handcrafted Designs",
    description: "Each piece is made with care, detail and bespoke craftsmanship.",
  },
  {
    icon: Headset,
    title: "24/7 Customer Service",
    description: "Friendly support whenever you need us, on call or WhatsApp.",
  },
];

export function TrustBadges() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        {badges.map((badge) => (
          <div key={badge.title} className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <badge.icon className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-sm font-semibold sm:text-base">{badge.title}</h3>
            <p className="hidden text-xs text-muted-foreground sm:block sm:text-sm">
              {badge.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
