import React, { useState } from "react";
import { useRouter } from "next/navigation";

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3L4.3 7.6l5.3-.8L12 2z"
                />
              </svg>
            </span>
            <div>
              <h1 className="text-lg font-bold">Diamond Cleaning</h1>
              <p className="text-xs text-blue-200">Admin Dashboard</p>
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
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Bookings</p>
            <p className="mt-2 text-3xl font-bold text-blue-900">
              {bookings.length}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Pending</p>
            <p className="mt-2 text-3xl font-bold text-yellow-500">
              {pendingCount}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Confirmed</p>
            <p className="mt-2 text-3xl font-bold text-green-500">
              {confirmedCount}
            </p>
          </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {["all", "pending", "confirmed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Bookings table */}
        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
          {filteredBookings.length === 0 ? (
            <p className="p-10 text-center text-gray-500">
              No bookings found.
            </p>
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
                                  expanded === booking.id
                                    ? null
                                    : booking.id
                                )
                              }
                              className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                            >
                              {expanded === booking.id ? "Hide" : "View"}
                            </button>
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
