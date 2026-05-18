'use client'
import { useRouter } from "next/navigation";

export function CtaSection() {
  const router = useRouter();

  return (
    <section className="bg-section pb-12 sm:pb-14 lg:pb-16">
      <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 text-center sm:max-w-2xl sm:px-6 lg:max-w-5xl lg:px-8">
        <h2 className="text-[1.6rem] leading-tight font-semibold tracking-tight text-slate-900 sm:text-[1.9rem] lg:text-[2.2rem]">
          Siap Rencanakan Trip?
        </h2>
        <p className="mt-2 max-w-[24rem] text-[0.72rem] text-muted sm:text-xs lg:text-sm">
          Pilih kota, destinasi, hotel, dan hitung estimasi biaya langsung
          di halaman perencanaan
        </p>
        <button
          className="mt-5 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark"
          type="button"
          onClick={() => router.push('/plan')}
        >
          Rencanakan Sekarang
        </button>
      </div>
    </section>
  );
}