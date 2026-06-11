/** Formats a number as an Indian Rupee amount, e.g. 29999 -> "₹29,999". */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Discount percentage off the original price, rounded to the nearest whole number. */
export function calculateDiscountPercent(price: number, salePrice: number): number {
  return Math.round(((price - salePrice) / price) * 100);
}
