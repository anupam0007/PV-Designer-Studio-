import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/hero";
import { CategoryCard } from "@/components/category-card";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { TrustBadges } from "@/components/trust-badges";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { InstagramFeed } from "@/components/instagram-feed";
import { StudioLocations } from "@/components/studio-locations";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAllProducts } from "@/lib/products-data";
import { getAllCategories } from "@/lib/categories-data";
import { getAllTestimonials } from "@/lib/testimonials-data";
import { getAllLocations } from "@/lib/locations-data";
import { getHeroSlides } from "@/lib/site-settings-data";
import { featuredCategories, getCategoryCount } from "@/data/categories";

const lookbook = [
  { id: 1, image: "/images/products/arrora-1.jpg" },
  { id: 2, image: "/images/products/lavender-elegance-1.jpg" },
  { id: 3, image: "/images/products/green-orchid-1.jpg" },
  { id: 4, image: "/images/products/wisteria-1.jpg" },
  { id: 5, image: "/images/products/luxe-velvet-1.jpg" },
  { id: 6, image: "/images/products/emerald-sherwani-1.jpg" },
  { id: 7, image: "/images/products/little-royal-fusion-1.jpg" },
  { id: 8, image: "/images/extra/extra-7.jpg" },
];

export default async function HomePage() {
  const [products, categories, testimonials, locations, heroSlides] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    getAllTestimonials(),
    getAllLocations(),
    getHeroSlides(),
  ]);
  const newArrivals = products.filter((p) => p.isNew);
  const offers = products.filter((p) => p.isOffer);
  const bestsellers = products.filter((p) => p.isBestseller);

  return (
    <>
      <Hero slides={heroSlides} />

      {/* Featured category cards */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Handpicked for you"
          title="Featured Collections"
          subtitle="The looks everyone's loving this season — explore our most-loved categories."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {featuredCategories.map((cat, i) => (
            <FadeIn key={cat.slug} delay={i * 100}>
              <CategoryCard
                href={`/shop/${cat.slug}`}
                name={cat.name}
                image={cat.image}
                subtitle={cat.tag}
              />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Shop by category */}
      <section className="bg-secondary/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Browse"
            title="Shop by Category"
            subtitle="From bridal lehengas to little ones' festive wear — find exactly what you're looking for."
          />
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {categories.map((cat, i) => (
              <FadeIn key={cat.slug} delay={i * 60}>
                <CategoryCard
                  href={cat.slug === "women" ? "/shop" : `/shop/${cat.slug}`}
                  name={cat.name}
                  image={cat.image}
                  subtitle={`${getCategoryCount(products, cat.slug)} Products`}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Just In"
          title="New Arrivals"
          subtitle="Fresh off the workbench — our latest handcrafted designs."
        />
        <Carousel opts={{ align: "start" }}>
          <CarouselContent>
            {newArrivals.map((product) => (
              <CarouselItem key={product.id} className="basis-1/2 sm:basis-1/3 lg:basis-1/4">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 hidden sm:flex" />
          <CarouselNext className="right-0 hidden sm:flex" />
        </Carousel>
      </section>

      {/* Offer of the Day */}
      <section className="bg-primary/5 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Limited Time"
            title="Offer of the Day"
            subtitle="Grab these handcrafted pieces at special prices before they're gone."
          />
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {offers.map((product, i) => (
              <FadeIn key={product.id} delay={i * 80}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/shop/offers">View All Offers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Customer Favourites"
          title="Best Sellers"
          subtitle="The designs our clients keep coming back for."
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {bestsellers.map((product, i) => (
            <FadeIn key={product.id} delay={i * 80}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      </section>

      <TrustBadges />

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="700+ Google Reviews"
          title="What Our Clients Say"
          subtitle="Loved by 20 lakh+ customers across the world."
        />
        <TestimonialCarousel testimonials={testimonials} />
      </section>

      {/* Client Spotlight */}
      <section className="bg-secondary/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Real Brides, Real Style"
            title="Client Spotlight"
            subtitle="A glimpse into the moments our outfits were made for."
          />
          <div className="columns-2 gap-4 sm:columns-3 md:columns-4 [&>*]:mb-4">
            {lookbook.map((item) => (
              <div key={item.id} className="img-zoom overflow-hidden rounded-lg break-inside-avoid">
                <Image
                  src={item.image}
                  alt="PV Designer Studio client lookbook"
                  width={600}
                  height={800}
                  className="h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio locations */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Visit Us"
          title="Our Studio Locations"
          subtitle="Walk in for a personal consultation, or book a virtual appointment."
        />
        <StudioLocations locations={locations} />
      </section>

      {/* Instagram feed */}
      <section className="bg-secondary/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="188K+ Followers" title="Follow Us on Instagram" />
          <InstagramFeed />
        </div>
      </section>
    </>
  );
}
