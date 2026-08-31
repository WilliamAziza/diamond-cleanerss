import { isAuthenticated } from "@/lib/auth";
import { getAllBookings } from "@/lib/db";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  const bookings = await getAllBookings();

  return <AdminDashboard bookings={bookings} />;
}
