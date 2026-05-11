import type { Metadata } from "next";
import { AdminDashboardHeader } from "@/components/admin/dashboard/admin-dashboard-header";
import { AdminDashboardContent } from "@/components/admin/dashboard/admin-dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard | Admin Edutrip",
  description: "Panel dashboard admin untuk mengelola data Edutrip.",
};

export default function AdminDashboardPage() {
  return (
    <main className="min-h-dvh w-full bg-slate-50 md:min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <AdminDashboardHeader />
        <AdminDashboardContent />
      </div>
    </main>
  );
}
