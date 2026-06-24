"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { InstagramIcon } from "@/components/social-icons";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Flash Sale", href: "/flash-sale" },
  { label: "Designer", href: "/designer" },
  { label: "Size Chart", href: "/size-chart" },
];

const INSTAGRAM_URL = "https://www.instagram.com/pvdesignerstudio/";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Android back button: push a dummy history entry when menu opens,
  // so pressing back closes the menu instead of leaving the page.
  useEffect(() => {
    if (!open) return;

    window.history.pushState({ menuOpen: true }, "");

    function handlePopState() {
      setOpen(false);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="PV Designer Studio — Home"
        >
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
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="flex w-72 flex-col">
            <SheetHeader className="shrink-0">
              <SheetTitle>
                <Image
                  src="/images/logo.png"
                  alt="PV Designer Studio"
                  width={150}
                  height={39}
                  className="h-9 w-auto"
                />
              </SheetTitle>
            </SheetHeader>

            {/* Nav links */}
            <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-4 pt-2">
              {/* Home */}
              <Link
                href="/"
                onClick={closeMenu}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-muted",
                  pathname === "/" ? "text-primary" : "text-foreground"
                )}
              >
                <Home className="h-4 w-4 shrink-0" />
                Home
              </Link>

              {/* Main pages */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={cn(
                    "rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-muted",
                    pathname === link.href ? "text-primary" : "text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* Instagram — pinned to bottom */}
              <div className="mt-auto border-t border-border pt-4 pb-2">
                <Link
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex items-center gap-2.5 rounded-md px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                >
                  <InstagramIcon className="h-5 w-5 shrink-0" />
                  Instagram
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
