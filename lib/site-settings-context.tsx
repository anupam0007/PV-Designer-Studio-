"use client";

import { createContext, useContext, type ReactNode } from "react";

interface SiteSettingsContextValue {
  whatsappNumber: string;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null);

export function SiteSettingsProvider({
  whatsappNumber,
  children,
}: SiteSettingsContextValue & { children: ReactNode }) {
  return (
    <SiteSettingsContext.Provider value={{ whatsappNumber }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

/** The studio's WhatsApp number, configurable from /admin/settings. */
export function useWhatsAppNumber(): string {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) throw new Error("useWhatsAppNumber must be used within SiteSettingsProvider");
  return ctx.whatsappNumber;
}
