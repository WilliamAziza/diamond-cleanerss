export const SERVICE_PRICES: Record<string, number> = {
  "Domestic Cleaning": 6000,
  "End of Tenancy Cleaning": 12000,
  "Commercial Cleaning": 10000,
  "Deep Cleaning": 9000,
  "Carpet Cleaning": 5000,
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
  return SERVICE_PRICES[service] || 5000;
}

export function formatPrice(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}

export function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  const Stripe = require("stripe");
  return new Stripe(secretKey);
}
