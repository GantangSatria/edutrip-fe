import { SectionHeading } from "@/components/ui/section-heading";
import { destinations } from "@/data/travel";

export function DestinationsSection() {
  return (
    <section className="bg-section py-11 sm:py-14 lg:py-16">
      <SectionHeading
        title="Semua Destinasi"
        subtitle="Pilih kategori di atas untuk filter, atau lihat semua"
      />
      <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3 px-4 sm:max-w-2xl sm:grid-cols-3 sm:px-6 lg:max-w-5xl lg:grid-cols-4 lg:gap-5 lg:px-8">
        {destinations.map((destination) => (
          <article
            key={destination.name}
            className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="h-24 overflow-hidden sm:h-28 lg:h-32">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${destination.image}')` }}
              />
            </div>
            <div className="p-2.5">
              <h3 className="text-xs font-semibold text-slate-900">
                {destination.name}
              </h3>
              <p className="mt-1 text-[0.65rem] text-muted">
                {destination.location}
              </p>
              <p className="mt-1 text-[0.65rem] text-muted">
                {destination.price}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}