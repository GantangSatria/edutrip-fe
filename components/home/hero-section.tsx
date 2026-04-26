'use client'
import { useRouter } from "next/navigation";

export function HeroSection() {
    const router = useRouter()

  return (
    <section className="relative min-h-[490px] pt-20 overflow-hidden sm:min-h-[560px] lg:min-h-[650px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.4), rgba(15,23,42,0.45)), url('https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1500&q=80')",
        }}
      />

      <div className="relative mx-auto flex h-full w-full max-w-md flex-col px-4 pt-6 sm:max-w-2xl sm:px-6 sm:pt-8 lg:max-w-5xl lg:px-8 lg:pt-10">

        <div className="mt-auto mb-10 text-center text-white sm:mb-14 lg:mb-16">
          <span className="inline-flex items-center rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[0.65rem] font-medium backdrop-blur-sm sm:text-[0.72rem]">
            Musim-Friendly Trip Planner
          </span>
            <h1 className="mx-auto mt-4 max-w-[19rem] text-[1.75rem] leading-[1.2] font-semibold tracking-tight sm:max-w-[30rem] sm:text-[2.35rem] lg:max-w-[38rem] lg:text-[2.9rem]">
            Rencanakan{" "}
            <span className="text-green-700">Edutrip</span>{" "}
            Halal Impianmu ke Jepang
            </h1>
          <p className="mx-auto mt-3 max-w-[20rem] text-[0.78rem] text-white/85 sm:max-w-[28rem] sm:text-[0.92rem] lg:max-w-[34rem] lg:text-[0.98rem]">
            Susun perjalanan & wisata edukasi halal ke Tokyo, Osaka, dan Kyoto. 
            Hitung dan susun estimasi biaya secara real-time.
          </p>
          <button
            className="mt-5 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark sm:px-7 sm:py-3"
            type="button"
            onClick={() => router.push('/plan')}
          >
            Mulai Rencanakan
          </button>
        </div>
      </div>
    </section>
  );
}