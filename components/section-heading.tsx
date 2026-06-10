import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-2 sm:mb-10",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-semibold sm:text-3xl md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">{subtitle}</p>
      )}
    </div>
  );
}
