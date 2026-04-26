export function FeaturesSection() {
  return (
    <section className="relative bg-section pt-16 pb-32 text-center">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:max-w-5xl lg:px-8">
        
        <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
          Siap Menjelajah Jepang dengan{" "}
          <span className="text-green-600">Nyaman & Halal?</span>
        </h2>

        <p className="mt-4 text-sm text-gray-500">
          Bergabunglah dengan 25.000+ Muslim Traveler yang sudah menikmati
          perjalanan halal-friendly di Jepang
        </p>

        {/* Stats */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-gray-500">
          <span>100% Halal Verified</span>
          <span>300+ Masjid Terdaftar</span>
          <span>1,200+ Restoran Halal</span>
        </div>
      </div>

      {/* WAVE */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-[100px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C360,0 1080,160 1440,80 L1440,120 L0,120 Z"
            className="fill-slate-950"
          />
        </svg>
      </div>
    </section>
  );
}