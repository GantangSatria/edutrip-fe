import Link from "next/link";

export function AdminLoginBrand() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 self-start transition-opacity hover:opacity-80">
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 bg-white shadow-sm"
        aria-hidden
      >
        <span className="h-5 w-5 rounded-full bg-red-600 ring-2 ring-white" />
      </span>
      <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">EDUTRIP Japan</span>
    </Link>
  );
}
