"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import diamondImage from "./diamond.jpeg";

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  address: string;
  notes: string | null;
  status: string;
  created_at: string;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminDashboard({ bookings }: { bookings: Booking[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((b) => b.status === filter);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

const handleDelete = async (id: number) => {
    try {
      const res = await fetch("/api/bookings/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete booking");
      }
    } catch {
      alert("Something went wrong");
    }
  };

const handleStatus = async (id: number, status: string) => {
    try {
      const res = await fetch("/api/bookings/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (res.ok) {
        if (status === "confirmed") {
          if (data.emailSent) {
            alert("Booking confirmed. Confirmation email sent to customer.");
          } else {
            alert(
              "Booking confirmed. Note: confirmation email was not sent (SMTP not configured)."
            );
          }
        }
        router.refresh();
      } else {
        alert(data.error || "Failed to update booking status");
      }
    } catch {
      alert("Something went wrong");
    }
  };

return (
    <div className="relative min-h-screen">
      {/* Diamond image background */}
      <Image
        src={diamondImage}
        alt=""
        fill
        priority
        className="fixed inset-0 -z-10 object-cover"
      />
      <div className="fixed inset-0 z-0 bg-blue-950/85" />

      <header className="relative z-10 border-b border-white/10 bg-blue-950/60 text-white backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full ring-2 ring-cyan-400/50">
              <Image
                src={diamondImage}
                alt="Diamond"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </span>
            <div>
              <h1 className="text-lg font-bold">Diamond Cleaning</h1>
              <p className="text-xs text-blue-200">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
            >
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

<main className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/90 p-6 shadow-sm backdrop-blur">
            <p className="text-sm font-medium text-gray-500">Total Bookings</p>
            <p className="mt-2 text-3xl font-bold text-blue-900">
              {bookings.length}
            </p>
          </div>
          <div className="rounded-2xl bg-white/90 p-6 shadow-sm backdrop-blur">
            <p className="text-sm font-medium text-gray-500">Pending</p>
            <p className="mt-2 text-3xl font-bold text-yellow-500">
              {pendingCount}
            </p>
          </div>
          <div className="rounded-2xl bg-white/90 p-6 shadow-sm backdrop-blur">
            <p className="text-sm font-medium text-gray-500">Confirmed</p>
            <p className="mt-2 text-3xl font-bold text-green-500">
              {confirmedCount}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {["all", "pending", "confirmed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white/90 text-gray-700 backdrop-blur hover:bg-white"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl bg-white/90 shadow-sm backdrop-blur">
          {filteredBookings.length === 0 ? (
            <p className="p-10 text-center text-gray-500">No bookings found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                    <th className="px-5 py-3">ID</th>
                    <th className="px-5 py-3">Customer</th>
                    <th className="px-5 py-3">Service</th>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Time</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Booked</th>
                    <th className="px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <React.Fragment key={booking.id}>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-5 py-4 font-medium text-gray-400">
                          #{booking.id}
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-semibold text-gray-900">
                            {booking.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {booking.email} · {booking.phone}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-gray-700">
                          {booking.service}
                        </td>
                        <td className="px-5 py-4 text-gray-700">
                          {booking.date}
                        </td>
                        <td className="px-5 py-4 text-gray-700">
                          {booking.time}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-gray-500">
                          {formatDate(booking.created_at)}
                        </td>
                        <td className="px-5 py-4">
<div className="flex gap-2">
                            <button
                              onClick={() =>
                                setExpanded(
                                  expanded === booking.id ? null : booking.id
                                )
                              }
                              className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                            >
                              {expanded === booking.id ? "Hide" : "View"}
                            </button>
                            {booking.status === "pending" && (
                              <button
                                onClick={() =>
                                  handleStatus(booking.id, "confirmed")
                                }
                                className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700"
                              >
                                Confirm
                              </button>
                            )}
                            {booking.status === "confirmed" && (
                              <button
                                onClick={() =>
                                  handleStatus(booking.id, "pending")
                                }
                                className="rounded-lg bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700 hover:bg-yellow-100"
                              >
                                Mark Pending
                              </button>
                            )}
                            {confirmDelete === booking.id ? (
                              <button
                                onClick={() => handleDelete(booking.id)}
                                className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
                              >
                                Confirm
                              </button>
                            ) : (
                              <button
                                onClick={() => setConfirmDelete(booking.id)}
                                className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                      {expanded === booking.id && (
                        <tr>
                          <td colSpan={8} className="bg-blue-50/50 px-5 py-4">
                            <div className="grid gap-3 sm:grid-cols-2">
                              <p className="text-sm text-gray-700">
                                <span className="font-semibold">Address:</span>{" "}
                                {booking.address}
                              </p>
                              <p className="text-sm text-gray-700">
                                <span className="font-semibold">Phone:</span>{" "}
                                {booking.phone}
                              </p>
                              <p className="text-sm text-gray-700">
                                <span className="font-semibold">Email:</span>{" "}
                                {booking.email}
                              </p>
                              <p className="text-sm text-gray-700">
                                <span className="font-semibold">Notes:</span>{" "}
                                {booking.notes || "None"}
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
