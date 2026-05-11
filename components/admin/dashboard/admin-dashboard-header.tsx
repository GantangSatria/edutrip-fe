import Link from "next/link";

export function AdminDashboardHeader() {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-primary hover:opacity-80 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Dashboard Admin</h1>
        </div>
        <p className="mt-1 text-sm text-slate-500 sm:text-base">Kelola data universitas dan destinasi wisata</p>
      </div>
    </div>
  );
}
