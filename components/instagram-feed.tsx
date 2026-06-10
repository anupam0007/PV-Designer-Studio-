import Image from "next/image";
import Link from "next/link";
import { InstagramIcon } from "@/components/social-icons";
import { getContactSettings } from "@/lib/site-settings-data";

const posts = [
  { id: 1, image: "/images/products/aarohi-1.jpg" },
  { id: 2, image: "/images/products/blackberry-1.jpg" },
  { id: 3, image: "/images/products/simran-1.jpg" },
  { id: 4, image: "/images/products/kanmani-2.jpg" },
  { id: 5, image: "/images/products/honey-2.jpg" },
  { id: 6, image: "/images/products/daffodil-1.jpg" },
];

export async function InstagramFeed() {
  const contact = await getContactSettings();

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="grid w-full grid-cols-3 gap-2 sm:gap-4 md:grid-cols-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="img-zoom group relative block aspect-square overflow-hidden rounded-lg bg-muted"
            aria-label="View post on Instagram"
          >
            <Image
              src={post.image}
              alt="PV Designer Studio Instagram post"
              fill
              sizes="(max-width: 640px) 33vw, 16vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
              <InstagramIcon className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </Link>
        ))}
      </div>
      <Link
        href={contact.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 font-medium text-primary hover:underline"
      >
        <InstagramIcon className="h-5 w-5" /> @pvdesignerstudio
      </Link>
    </div>
  );
}
