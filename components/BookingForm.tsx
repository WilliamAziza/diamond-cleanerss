"use client";

import { useState } from "react";
import { SERVICE_PRICES, formatPrice } from "@/lib/stripe";

export const serviceOptions = [
  "Domestic Cleaning",
  "End of Tenancy Cleaning",
  "Commercial Cleaning",
  "Deep Cleaning",
  "Carpet Cleaning",
];

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: serviceOptions[0],
    date: "",
    time: "morning",
    address: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Create a Stripe Checkout session and redirect to payment
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Payment could not be initiated. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const selectedPrice = SERVICE_PRICES[form.service] || 5000;

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl md:p-10">
      <h3 className="text-2xl font-bold text-blue-900">
        Book &amp; Pay Online
      </h3>
      <p className="mt-2 text-gray-600">
        Select your service, choose a date, and pay securely online. Your
        booking is confirmed instantly after payment.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Full Name*
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Email*
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="jane@email.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
            Phone Number*
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="+44 7123 456789"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
            Service Required*
          </label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Preferred Date*
            </label>
            <input
              type="date"
              name="date"
              required
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Preferred Time
            </label>
            <select
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="morning">Morning (8am - 12pm)</option>
              <option value="afternoon">Afternoon (12pm - 5pm)</option>
              <option value="evening">Evening (5pm - 8pm)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
            Service Address*
          </label>
          <input
            type="text"
            name="address"
            required
            value={form.address}
            onChange={handleChange}
            placeholder="Full address incl. postcode"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
            Additional Notes
          </label>
          <textarea
            name="notes"
            rows={3}
            value={form.notes}
            onChange={handleChange}
            placeholder="Any special requirements or instructions"
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Price summary */}
        <div className="flex items-center justify-between rounded-xl bg-blue-50 px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-blue-900">
              {form.service}
            </p>
            <p className="text-xs text-gray-500">
              {form.date || "Select a date"} · {form.time}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-extrabold text-blue-900">
              {formatPrice(selectedPrice)}
            </p>
            <p className="text-xs text-gray-500">Secure payment</p>
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-blue-600 py-4 text-base font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? (
            "Redirecting to payment..."
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h18M7 15h2m4 0h2m-9-5l1-4h12l1 4M5 10h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z"
                />
              </svg>
              Pay &amp; Book ({formatPrice(selectedPrice)})
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400">
          🔒 Secured by Stripe. Your payment details are encrypted and never
          stored on our servers.
        </p>
      </form>
    </div>
  );
}
