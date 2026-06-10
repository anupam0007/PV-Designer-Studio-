import type { ReactNode } from "react";
import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { signOut } from "./actions";

export const metadata = {
  title: "Admin | PV Designer Studio",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold">Admin setup required</h1>
        <p className="mt-4 text-muted-foreground">
          The admin panel needs a Supabase project. Create one at{" "}
          <span className="font-medium text-foreground">supabase.com</span>, run{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">supabase/schema.sql</code> in
          its SQL editor, then copy{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">.env.local.example</code> to{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">.env.local</code> and fill in
          your project&apos;s URL and keys. See the README for the full walkthrough.
        </p>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const navLinks = [
    { href: "/admin", label: "Products" },
    { href: "/admin/reviews", label: "Reviews" },
    { href: "/admin/categories", label: "Categories" },
    { href: "/admin/locations", label: "Locations" },
    { href: "/admin/settings", label: "Site Settings" },
  ];

  return (
    <div className="min-h-screen bg-secondary/20">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/admin" className="font-heading text-lg font-semibold">
            PV Designer Studio — Admin
          </Link>
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <form action={signOut}>
                <Button type="submit" variant="outline" size="sm">
                  Sign Out
                </Button>
              </form>
            </div>
          )}
        </div>
        {user && (
          <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
