import Stripe from "stripe";

// Initialize Stripe with your secret key (set in .env.local)
export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder",
  {

  }
);

// Service pricing in pence (GBP). Update these to your real prices.
// Format: service name (must match BookingForm exactly) => price in pence
export const SERVICE_PRICES: Record<string, number> = {
  "Domestic Cleaning": 6000, // £60.00 per session
  "End of Tenancy Cleaning": 12000, // £120.00
  "Commercial Cleaning": 10000, // £100.00 per visit
  "Deep Cleaning": 9000, // £90.00
  "Carpet Cleaning": 5000, // £50.00
};

export interface CheckoutDetails {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  address: string;
  notes?: string;
}

export function getServicePrice(service: string): number {
  return SERVICE_PRICES[service] || 5000; // default £50 if unknown
}

export function formatPrice(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}
