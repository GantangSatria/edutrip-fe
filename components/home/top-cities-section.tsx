"use client";

import { useState, useCallback } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { CityDetailModal } from "@/components/home/city-detail-modal";
import { useFetch } from "@/hooks/useFetch";
import { kotaService } from "@/lib/service";
import { getImageUrl } from "@/lib/image";
import type { City, CityFeature, CityFeatureId } from "@/types/travel";

const cityMeta: Record<string, { tagline: string; halal: string }> = {
  Tokyo: { tagline: "Ibu kota teknologi dan budaya modern", halal: "150+ Halal" },
  Osaka: { tagline: "Surga kuliner & kastil bersejarah", halal: "80+ Halal" },
  Kyoto: { tagline: "Kota kuil & tradisi Jepang klasik", halal: "50+ Halal" },
};

export function TopCitiesSection() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const { data: rawCities } = useFetch(() => kotaService.getAll(), []);

  // Map API data to the frontend City type
  const dynamicCityCards: City[] = (rawCities || []).map((kota) => {
    // Parse features if they come as string array or stringified JSON
    let parsedFeatures: any[] = [];
    if (Array.isArray(kota.features)) {
      parsedFeatures = kota.features;
    } else if (typeof kota.features === "string") {
      try {
        parsedFeatures = JSON.parse(kota.features);
      } catch {
        parsedFeatures = (kota.features as string).split(",").map((s) => s.trim()).filter(Boolean);
      }
    }

    const features: CityFeature[] = parsedFeatures.map((f: any, i) => {
      if (typeof f === "object" && f !== null) {
        return {
          id: (f.id as CityFeatureId) || "building",
          text: f.text || JSON.stringify(f),
        };
      }
      return {
        id: "building", // Fallback icon ID for plain strings
        text: String(f),
      };
    });

    return {
      name: kota.name,
      image: getImageUrl(kota.image, "kota"),
      description: kota.description || "",
      halalSpotsValue: kota.halal_spots_value || "0+",
      halalSpotsLabel: kota.halal_spots_label || "Tempat Halal",
      mainMosqueTitle: kota.main_mosque_title || "",
      mainMosqueSubtitle: kota.main_mosque_subtitle || "",
      features,
      terrainLead: kota.terrain_lead || "Medan:",
      terrainRest: kota.terrain_rest || "",
    };
  });

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
      <div className="mx-auto grid w-full max-w-md grid-cols-1 gap-4 px-4 sm:max-w-2xl sm:grid-cols-3 sm:px-6 lg:max-w-5xl lg:gap-5 lg:px-8">
        {dynamicCityCards.map((city) => {
          const meta = cityMeta[city.name] || { tagline: "", halal: city.halalSpotsValue + " Halal" };
          return (
            <button
              key={city.name}
              type="button"
              onClick={() => handleOpen(city)}
              className="group relative h-80 w-full overflow-hidden rounded-2xl text-left ring-offset-2 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-[22rem] lg:h-[26rem]"
            >
              {/* Background image */}
              <span
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 group-active:scale-[1.02]"
                style={{ backgroundImage: `url('${city.image}')` }}
              />
              {/* Gradient overlay */}
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden />

              {/* Content overlay */}
              <span className="absolute inset-x-0 bottom-0 flex flex-col p-4 sm:p-5">
                {/* Japan badge */}
                <span className="inline-flex w-fit items-center gap-1 text-[0.65rem] font-medium text-emerald-400 sm:text-xs">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" /></svg>
                  Japan
                </span>

                {/* City name */}
                <span className="mt-1 text-2xl font-bold text-white sm:text-3xl">{city.name}</span>

                {/* Tagline */}
                <span className="mt-0.5 text-xs text-white/80 sm:text-sm">{meta.tagline}</span>

                {/* Bottom row */}
                <span className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-[rgba(74,181,64,0.6)] px-2 py-0.5 text-[0.6rem] font-semibold text-white sm:text-[0.7rem]">
                    🕌 {meta.halal}
                  </span>
                  <span className="text-[0.65rem] text-white/70 transition-colors group-hover:text-white sm:text-xs">
                    Tap untuk info →
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <CityDetailModal city={selectedCity} onClose={handleClose} />
    </section>
  );
}
