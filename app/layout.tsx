import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Toaster } from "@/components/ui/sonner";
import { getContactSettings } from "@/lib/site-settings-data";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PV Designer Studio — Customize Your Charm",
  description:
    "Bespoke, handcrafted bridal lehengas, designer gowns and bridal blouses by PV Designer Studio, Bangalore. Custom-made ethnic wear for women, men & kids with worldwide delivery and virtual consultations.",
  keywords: [
    "PV Designer Studio",
    "bridal lehenga Bangalore",
    "designer gowns",
    "bridal blouse",
    "Indo-Western outfits",
    "custom ethnic wear",
    "Chitra Murugaiyan",
  ],
  openGraph: {
    title: "PV Designer Studio — Customize Your Charm",
    description:
      "Bespoke, handcrafted bridal lehengas, designer gowns and bridal blouses with worldwide delivery and virtual consultations.",
    siteName: "PV Designer Studio",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = await getContactSettings();

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers whatsappNumber={contact.whatsappNumber}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
