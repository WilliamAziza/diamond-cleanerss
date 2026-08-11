"use client";

import { useState } from "react";

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
  const [success, setSuccess] = useState("");
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
    setSuccess("");

    try {
      const res = await fetch("/api/bookings", {
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

      setSuccess("Thank you for booking! We have received your booking and will contact you soon.");
      setForm({
        name: "",
        email: "",
        phone: "",
        service: serviceOptions[0],
        date: "",
        time: "morning",
        address: "",
        notes: "",
      });
      setLoading(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl md:p-10">
      <h3 className="text-2xl font-bold text-blue-900">
        Book Now
      </h3>
      <p className="mt-2 text-gray-600">
        Select your service and preferred date, then book your cleaning. We will
        contact you shortly to confirm the appointment.
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

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        {success && (
          <p className="rounded-lg bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-blue-600 py-4 text-base font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Submitting booking..." : "Book Now"}
        </button>
      </form>
    </div>
  );
}
