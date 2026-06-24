"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Home, Mail, Menu, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/social-icons";
import { contact, socials } from "@/data/locations";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Flash Sale", href: "/flash-sale" },
  { label: "Designer", href: "/designer" },
  { label: "Size Chart", href: "/size-chart" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Android back button: push dummy history entry when menu opens
  // so pressing back closes the drawer instead of leaving the page.
  useEffect(() => {
    if (!open) return;
    window.history.pushState({ menuOpen: true }, "");
    function handlePopState() { setOpen(false); }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [open]);

  // Navigate without the flash — close menu immediately and push route on next tick
  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="PV Designer Studio — Home">
          <Image src="/images/logo.png" alt="PV Designer Studio" width={180} height={47} priority className="h-10 w-auto sm:h-12" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className={cn("text-sm font-medium tracking-wide transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="flex w-80 flex-col p-0">
            <SheetHeader className="shrink-0 border-b border-border px-5 py-4">
              <SheetTitle>
                <Image src="/images/logo.png" alt="PV Designer Studio" width={140} height={36} className="h-8 w-auto" />
              </SheetTitle>
            </SheetHeader>

            {/* Scrollable body */}
            <div className="flex flex-1 flex-col overflow-y-auto">

              {/* ── Nav links ── */}
              <div className="flex flex-col gap-0.5 px-3 py-3">
                <button type="button" onClick={() => go("/")}
                  className={cn("flex items-center gap-2.5 rounded-md px-3 py-3 text-left text-base font-medium transition-colors hover:bg-muted",
                    pathname === "/" ? "text-primary" : "text-foreground"
                  )}
                >
                  <Home className="h-4 w-4 shrink-0" /> Home
                </button>

                {navLinks.map((link) => (
                  <button key={link.href} type="button" onClick={() => go(link.href)}
                    className={cn("rounded-md px-3 py-3 text-left text-base font-medium transition-colors hover:bg-muted",
                      pathname === link.href ? "text-primary" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* ── Social icons ── */}
              <div className="border-t border-border px-5 py-4">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {[
                    { href: socials.instagram, icon: <InstagramIcon className="h-5 w-5" />, label: "Instagram" },
                    { href: socials.facebook, icon: <FacebookIcon className="h-5 w-5" />, label: "Facebook" },
                    { href: socials.youtube, icon: <YoutubeIcon className="h-5 w-5" />, label: "YouTube" },
                  ].map(({ href, icon, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      aria-label={label}
                      onClick={() => setOpen(false)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* ── Contact details ── */}
              <div className="border-t border-border px-5 py-4">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Contact Us
                </p>
                <ul className="space-y-3">
                  {contact.phones.map((p) => (
                    <li key={p.number}>
                      <a href={`tel:${p.number.replace(/\s+/g, "")}`}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="text-[11px] text-muted-foreground">{p.label}</p>
                          <p className="font-medium text-foreground">{p.number}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                    >
                      <Mail className="h-4 w-4 shrink-0" />
                      {contact.email}
                    </a>
                  </li>
                  <li>
                    <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" />
                      WhatsApp Us
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
