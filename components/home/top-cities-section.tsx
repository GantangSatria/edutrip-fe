import { SectionHeading } from "@/components/ui/section-heading";
import { cityCards } from "@/data/travel";

export function TopCitiesSection() {
  return (
    <section className="bg-section py-11 sm:py-14 lg:py-16">
      <SectionHeading
        title="3 Kota Utama Jepang"
        subtitle="Kenali kota-kota tujuan sebelum merencanakan trip"
      />
      <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3 px-4 sm:max-w-2xl sm:grid-cols-3 sm:px-6 lg:max-w-5xl lg:gap-5 lg:px-8">
        {cityCards.map((city) => (
          <article
            key={city.name}
            className="group relative h-44 overflow-hidden rounded-2xl sm:h-52 lg:h-64"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('${city.image}')` }}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <h3 className="text-sm font-semibold text-white">{city.name}</h3>
            </div>
          </article>
        ))}
      </div>
      <a 
        href="#"
        className="mt-5 block text-center text-[0.72rem] font-medium tracking-wide text-primary sm:mt-6">
        Lanjut Pilih Kategori
      </a>
    </section>
  );
}