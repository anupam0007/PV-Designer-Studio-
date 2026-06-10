import Link from "next/link";
import Image from "next/image";

export function CategoryCard({
  href,
  name,
  image,
  subtitle,
}: {
  href: string;
  name: string;
  image: string;
  subtitle?: string;
}) {
  return (
    <Link
      href={href}
      className="img-zoom group relative block aspect-[4/5] overflow-hidden rounded-xl bg-muted"
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <h3 className="font-heading text-lg font-semibold sm:text-xl">{name}</h3>
        {subtitle && <p className="text-xs text-white/80 sm:text-sm">{subtitle}</p>}
      </div>
    </Link>
  );
}
