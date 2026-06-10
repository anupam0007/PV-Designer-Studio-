"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { cn } from "@/lib/utils";

const shopLinks = {
  women: [
    { label: "Blouses", href: "/shop/blouses" },
    { label: "Gowns", href: "/shop/gowns" },
    { label: "Lehengas", href: "/shop/lehengas" },
    { label: "Indo-Western", href: "/shop/indo-western" },
  ],
  other: [
    { label: "Men", href: "/shop/men" },
    { label: "Kids", href: "/shop/kids" },
  ],
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Reviews", href: "/reviews" },
  { label: "Size Chart", href: "/size-chart" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const { totalItems } = useCart();
  const { slugs } = useWishlist();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="PV Designer Studio — Home">
          <Image
            src="/images/logo.png"
            alt="PV Designer Studio"
            width={180}
            height={47}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <Button asChild variant="ghost" className="font-medium">
            <Link href="/">Home</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="font-medium">
                Shop
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Women</DropdownMenuLabel>
              {shopLinks.women.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              {shopLinks.other.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/shop">View All</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {navLinks.slice(1).map((link) => (
            <Button key={link.href} asChild variant="ghost" className="font-medium">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search */}
          <div className="relative hidden sm:block">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <Input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onBlur={() => !query && setSearchOpen(false)}
                  placeholder="Search products..."
                  className="h-9 w-44 md:w-56"
                />
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Wishlist */}
          <Button asChild variant="ghost" size="icon" className="relative" aria-label="Wishlist">
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
              {slugs.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                  {slugs.length}
                </span>
              )}
            </Link>
          </Button>

          {/* Cart */}
          <Button asChild variant="ghost" size="icon" className="relative" aria-label="Cart">
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <Image src="/images/logo.png" alt="PV Designer Studio" width={150} height={39} className="h-9 w-auto" />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                <form onSubmit={handleSearch} className="mb-2 flex items-center gap-2">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="h-9"
                  />
                  <Button type="submit" size="icon" variant="secondary" aria-label="Search">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>

                <MobileLink href="/">Home</MobileLink>

                <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Women
                </p>
                {shopLinks.women.map((link) => (
                  <MobileLink key={link.href} href={link.href}>
                    {link.label}
                  </MobileLink>
                ))}

                <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  More
                </p>
                {shopLinks.other.map((link) => (
                  <MobileLink key={link.href} href={link.href}>
                    {link.label}
                  </MobileLink>
                ))}
                <MobileLink href="/shop">All Products</MobileLink>

                <div className="my-2 h-px bg-border" />

                {navLinks.slice(1).map((link) => (
                  <MobileLink key={link.href} href={link.href}>
                    {link.label}
                  </MobileLink>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MobileLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-muted"
      )}
    >
      {children}
    </Link>
  );
}
