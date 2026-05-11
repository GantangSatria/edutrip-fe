"use client";

import { useState, useCallback } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { CityDetailModal } from "@/components/home/city-detail-modal";
import { cityCards } from "@/data/travel";

import type { City } from "@/types/travel";

export function TopCitiesSection() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const handleOpen = useCallback((city: City) => {
    setSelectedCity(city);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedCity(null);
  }, []);

  return (
    <section className="bg-section py-11 sm:py-14 lg:py-16">
      <SectionHeading
        title="3 Kota Utama Jepang"
        subtitle="Kenali kota-kota tujuan sebelum merencanakan trip"
      />
      <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3 px-4 sm:max-w-2xl sm:grid-cols-3 sm:px-6 lg:max-w-5xl lg:gap-5 lg:px-8">
        {cityCards.map((city) => (
          <button
            key={city.name}
            type="button"
            onClick={() => handleOpen(city)}
            className="group relative h-44 w-full overflow-hidden rounded-2xl text-left ring-offset-2 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-52 lg:h-64"
          >
            <span className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 group-active:scale-[1.02]" style={{ backgroundImage: `url('${city.image}')` }} />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" aria-hidden />
            <span className="absolute inset-x-0 bottom-0 p-3">
              <span className="text-sm font-semibold text-white">{city.name}</span>
            </span>
          </button>
        ))}
      </div>
      <a
        href="#"
        className="mt-5 block text-center text-[0.72rem] font-medium tracking-wide text-primary sm:mt-6"
      >
        Lanjut Pilih Kategori
      </a>

      <CityDetailModal city={selectedCity} onClose={handleClose} />
    </section>
  );
}
