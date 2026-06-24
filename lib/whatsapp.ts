import { contact } from "@/data/locations";
import type { CartItem } from "./cart-context";
import { formatPrice } from "./format";

/** Builds a wa.me link with a pre-filled, URL-encoded message. */
export function buildWhatsAppLink(message: string, phone = contact.whatsappNumber) {
  return `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(
    message
  )}`;
}

/** Builds a WhatsApp checkout link summarising the cart contents. */
export function buildCartWhatsAppLink(items: CartItem[], subtotal: number, phone?: string) {
  const lines = items.map((item) => {
    const variant = [item.size, item.color].filter(Boolean).join(", ");
    return `• ${item.name}${variant ? ` (${variant})` : ""} x${item.quantity} — ${formatPrice(
      (item.salePrice ?? item.price) * item.quantity
    )}`;
  });

  const message = [
    "Hello PV Designer Studio! I'd like to order the following items:",
    "",
    ...lines,
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    "",
    "Please let me know the next steps.",
  ].join("\n");

  return buildWhatsAppLink(message, phone);
}

/** Builds a WhatsApp enquiry link for a single product. */
export function buildProductEnquiryLink(productName: string, phone?: string) {
  return buildWhatsAppLink(
    `Hello PV Designer Studio! I'm interested in "${productName}". Could you share more details?`,
    phone
  );
}

/** Flash Sale: message includes name, size, quantity, price, and image URL. */
export function buildFlashSaleWhatsAppLink(
  productName: string,
  size: string,
  qty: number,
  price: string,
  imageUrl: string,
  phone?: string
) {
  const message = [
    "Hello PV Designer Studio! I'd like to order:",
    "",
    `*${productName}*`,
    `Size: ${size}`,
    `Qty: ${qty}`,
    `Price: ${price}`,
    `Image: ${imageUrl}`,
    "",
    "Please confirm availability.",
  ].join("\n");
  return buildWhatsAppLink(message, phone);
}

/** Designer enquiry: message includes name, size, quantity, and image URL (no price). */
export function buildDesignerWhatsAppLink(
  productName: string,
  size: string,
  qty: number,
  imageUrl: string,
  phone?: string
) {
  const message = [
    "Hello PV Designer Studio! I'm interested in:",
    "",
    `*${productName}*`,
    `Size: ${size}`,
    `Qty: ${qty}`,
    `Image: ${imageUrl}`,
    "",
    "Please share more details and pricing.",
  ].join("\n");
  return buildWhatsAppLink(message, phone);
}
