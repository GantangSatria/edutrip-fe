"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import type { City, CityFeatureId } from "@/types/travel";

type CityDetailModalProps = {
  city: City | null;
  onClose: () => void;
};

function CityDetailHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="flex shrink-0 items-center gap-3 border-b border-slate-100 px-4 py-3.5 sm:px-5 sm:py-4">
      <h2 id="city-detail-title" className="min-w-0 flex-1 text-base font-bold text-slate-900 sm:text-lg">
        {title}
      </h2>
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm transition-colors hover:bg-primary-dark"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

function CityDetailHero({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100 sm:aspect-[16/9]">
      <Image src={image} alt={alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 600px" priority />
    </div>
  );
}

function HighlightGrid({
  halalValue,
  halalLabel,
  mosqueTitle,
  mosqueSubtitle,
}: {
  halalValue: string;
  halalLabel: string;
  mosqueTitle: string;
  mosqueSubtitle: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-2.5 min-[380px]:grid-cols-2 sm:gap-3">
      <div className="rounded-xl bg-slate-100 px-3 py-3 sm:px-4 sm:py-4">
        <p className="text-2xl font-bold text-slate-900 sm:text-3xl">{halalValue}</p>
        <p className="mt-1 text-xs font-medium text-slate-600 sm:text-sm">{halalLabel}</p>
      </div>
      <div className="flex flex-col justify-center rounded-xl bg-slate-100 px-3 py-3 sm:px-4 sm:py-4">
        <span className="mb-1 text-lg text-primary" aria-hidden>
          <MosqueGlyph className="h-6 w-6" />
        </span>
        <p className="text-sm font-bold text-slate-900 sm:text-base">{mosqueTitle}</p>
        <p className="mt-0.5 text-xs text-slate-600 sm:text-sm">{mosqueSubtitle}</p>
      </div>
    </div>
  );
}

function MosqueGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M8 21h8" />
      <path d="M5 10c2-2 5-3 7-3s5 1 7 3v11H5V10Z" />
      <path d="M3 21h18" />
      <path d="M9 7V5M12 5V3M15 7V5" />
    </svg>
  );
}

function FeatureIcon({ id }: { id: CityFeatureId }) {
  const cls = "h-4 w-4 text-primary";
  switch (id) {
    case "building":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
          <path d="M6 12h4M14 12h4M6 16h4M14 16h4M6 8h4M14 8h4" />
          <path d="M10 22v-4h4v4" />
        </svg>
      );
    case "mosque":
      return <MosqueGlyph className={cls} />;
    case "graduation":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case "utensils":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2M7 2v20" />
          <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h0Z" />
          <path d="M21 15v7" />
        </svg>
      );
    default:
      return null;
  }
}

function FeatureList({ features }: { features: City["features"] }) {
  return (
    <ul className="space-y-2">
      {features.map((f, index) => (
        <li
          key={`${f.id}-${index}`}
          className="flex items-center gap-3 rounded-xl bg-slate-100 px-3 py-2.5 sm:px-3.5 sm:py-3"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
            <FeatureIcon id={f.id} />
          </span>
          <span className="text-xs font-medium leading-snug text-slate-800 sm:text-sm">{f.text}</span>
        </li>
      ))}
    </ul>
  );
}

function CityTerrainBar({ lead, rest }: { lead: string; rest: string }) {
  return (
    <div className="rounded-xl bg-slate-100 px-3 py-3 text-xs leading-relaxed text-slate-700 sm:px-4 sm:text-sm">
      <span className="font-bold text-slate-900">{lead}</span>
      <span>{rest}</span>
    </div>
  );
}

export function CityDetailModal({ city, onClose }: CityDetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!city) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [city]);

  useEffect(() => {
    if (!city) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [city, onClose]);

  if (!city) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="city-detail-title"
        className="flex max-h-[100dvh] w-full max-w-[100vw] flex-col rounded-t-2xl bg-white shadow-2xl sm:max-h-[min(90dvh,720px)] sm:max-w-lg sm:rounded-2xl"
      >
        <CityDetailHeader title={city.name} onClose={onClose} />

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5 sm:py-5">
          <div className="space-y-4 sm:space-y-5">
            <CityDetailHero image={city.image} alt={`Gambar kota ${city.name}`} />
            <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">{city.description}</p>
            <HighlightGrid
              halalValue={city.halalSpotsValue}
              halalLabel={city.halalSpotsLabel}
              mosqueTitle={city.mainMosqueTitle}
              mosqueSubtitle={city.mainMosqueSubtitle}
            />
            <FeatureList features={city.features} />
            <CityTerrainBar lead={city.terrainLead} rest={city.terrainRest} />
          </div>
        </div>
      </div>
    </div>
  );
}
