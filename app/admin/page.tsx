import type { Metadata } from "next";
import Link from "next/link";

import { AdminLoginAside } from "@/components/admin/admin-login-aside";
import { AdminLoginBrand } from "@/components/admin/admin-login-brand";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata: Metadata = {
  title: "Admin | Edutrip",
  description: "Masuk ke panel admin Edutrip Japan.",
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-dvh w-full flex-col bg-white md:min-h-screen md:flex-row">
      <section className="flex w-full flex-1 flex-col px-6 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-14">
        <AdminLoginBrand />
        <div className="mx-auto mt-10 w-full max-w-md flex-1 sm:mt-14">
          <AdminLoginForm />
          <p className="mt-8 text-center text-xs text-slate-400">
            <Link href="/" className="font-medium text-primary underline-offset-2 hover:underline">
              ← Kembali ke beranda
            </Link>
          </p>
        </div>
      </section>

      <AdminLoginAside />
    </main>
  );
}
