export function AdminLoginAside() {
  return (
    <aside className="relative flex min-h-[42vh] w-full flex-1 flex-col items-center justify-center bg-primary px-6 py-14 text-center text-white md:min-h-dvh md:px-10 md:py-16 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_50%)]" aria-hidden />
      <div className="relative max-w-md">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm sm:h-24 sm:w-24">
          <svg
            className="h-10 w-10 text-white sm:h-12 sm:w-12"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </div>
        <h2 className="mt-8 text-xl font-bold leading-snug sm:text-2xl md:text-3xl">
          Jelajahi Jepang Tanpa Khawatir
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
          Temukan paket trip, restoran halal, dan masjid terdekat. Semua dalam satu platform.
        </p>
      </div>
    </aside>
  );
}
