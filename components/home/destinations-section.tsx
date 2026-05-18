"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

import { SectionHeading } from "@/components/ui/section-heading";
import { PlaceDetailModal } from "@/components/plan/place-detail-modal";
import { useFetch } from "@/hooks/useFetch";
import { wisataService } from "@/lib/service";
import { getImageUrl } from "@/lib/image";
import type { Wisata } from "@/types/wisata";
import type { PlanPlace } from "@/types/plan";



const PER_PAGE_MOBILE = 6;  // 2 cols × 3 rows
const PER_PAGE_DESKTOP = 6; // 3 cols × 2 rows

export function DestinationsSection() {
  const { data, loading } = useFetch(() => wisataService.getAll());
  const destinations: Wisata[] = useMemo(() => (data || []).slice(0, 12), [data]);

  const [page, setPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState<Wisata | null>(null);

  const mappedSelectedPlace: PlanPlace | null = useMemo(() => {
    if (!selectedItem) return null;
    return {
      id: String(selectedItem.id),
      categoryId: "wisata",
      area: selectedItem.kota,
      title: selectedItem.nama_wisata,
      subtitle: selectedItem.kategori_wisata,
      image: getImageUrl(selectedItem.foto, "wisata"),
      price: selectedItem.tiket_wisata,
      latitude: selectedItem.latitude,
      longitude: selectedItem.longitude,
      badge: selectedItem.kategori_wisata,
      rating: null,
      selected: false,
    };
  }, [selectedItem]);

  // We use the desktop page size for slicing and let CSS handle visibility
  const totalPages = Math.ceil(destinations.length / PER_PAGE_DESKTOP);
  const totalPagesMobile = Math.ceil(destinations.length / PER_PAGE_MOBILE);

  const currentItems = useMemo(() => {
    const start = page * PER_PAGE_DESKTOP;
    return destinations.slice(start, start + PER_PAGE_DESKTOP);
  }, [destinations, page]);

  // For mobile we further slice
  const mobileItems = useMemo(() => {
    const start = page * PER_PAGE_MOBILE;
    return destinations.slice(start, start + PER_PAGE_MOBILE);
  }, [destinations, page]);

  const canPrev = page > 0;
  const canNextDesktop = page < totalPages - 1;
  const canNextMobile = page < totalPagesMobile - 1;

  if (loading) {
    return (
      <section className="bg-section py-11 sm:py-14 lg:py-16">
        <SectionHeading title="Semua Destinasi" subtitle="Memuat data destinasi..." />
        <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3 px-4 sm:max-w-2xl sm:grid-cols-3 sm:px-6 lg:max-w-5xl lg:px-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-52 animate-pulse rounded-xl bg-slate-200" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-section py-11 sm:py-14 lg:py-16">
      <SectionHeading
        title="Semua Destinasi"
        subtitle="Pilih destinasi wisata edukasi & halal di Jepang"
      />

      {/* Desktop grid (3 cols) — hidden on mobile */}
      <div className="mx-auto hidden w-full max-w-5xl grid-cols-3 gap-5 px-8 sm:grid">
        {currentItems.map((item) => (
          <DestinationCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
        ))}
      </div>

      {/* Mobile grid (2 cols) — hidden on sm+ */}
      <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3 px-4 sm:hidden">
        {mobileItems.map((item) => (
          <DestinationCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
        ))}
      </div>

      {/* Pagination arrows */}
      {destinations.length > PER_PAGE_MOBILE && (
        <div className="mx-auto mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={!canPrev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Halaman sebelumnya"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Desktop page indicator */}
          <span className="hidden text-xs text-slate-500 sm:inline">
            {page + 1} / {totalPages}
          </span>
          {/* Mobile page indicator */}
          <span className="text-xs text-slate-500 sm:hidden">
            {page + 1} / {totalPagesMobile}
          </span>

          {/* Desktop next */}
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            disabled={!canNextDesktop}
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30 sm:flex"
            aria-label="Halaman berikutnya"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          {/* Mobile next */}
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            disabled={!canNextMobile}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30 sm:hidden"
            aria-label="Halaman berikutnya"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      {selectedItem && (
        <PlaceDetailModal
          place={mappedSelectedPlace}
          categoryLabel="Destinasi Wisata"
          categoryIcon="🏛️"
          onClose={() => setSelectedItem(null)}
          hideCartAction={true}
        />
      )}
    </section>
  );
}

function DestinationCard({ item, onClick }: { item: Wisata; onClick: () => void }) {
  const imgSrc = getImageUrl(item.foto, "wisata");

  return (
    <article 
      className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-28 overflow-hidden sm:h-32 lg:h-36">
        <Image
          src={imgSrc}
          alt={item.nama_wisata}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 33vw"
        />
        <span className="absolute top-2 right-2 rounded-md bg-black/50 px-1.5 py-0.5 text-[0.6rem] font-medium text-white backdrop-blur-[2px]">
          {item.kota}
        </span>
      </div>
      <div className="p-2.5 sm:p-3">
        <h3 className="truncate text-xs font-semibold text-slate-900 sm:text-sm">{item.nama_wisata}</h3>
        <p className="mt-0.5 text-[0.6rem] text-slate-500 sm:text-[0.7rem]">{item.kategori_wisata}</p>
      </div>
    </article>
  );
}