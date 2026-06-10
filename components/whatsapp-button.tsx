import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { getContactSettings, buildContactWhatsAppLink } from "@/lib/site-settings-data";

/** Floating WhatsApp chat button shown on every page. */
export async function WhatsAppButton() {
  const contact = await getContactSettings();
  const whatsappLink = buildContactWhatsAppLink(contact);

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
    </Link>
  );
}
