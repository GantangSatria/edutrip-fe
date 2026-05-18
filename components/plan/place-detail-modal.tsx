"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { formatIDR } from "@/lib/plan-calculator";
import type { PlanPlace } from "@/types/plan";

type PlaceDetailModalProps = {
  place: PlanPlace | null;
  categoryLabel: string;
  categoryIcon: string;
  onClose: () => void;
  onToggleCart?: (id: string) => void;
  hideCartAction?: boolean;
};

function regionBadgeFromArea(area: string): string {
  const parts = area.split(",").map((s) => s.trim()).filter(Boolean);
  return parts[parts.length - 1] ?? area;
}

function mapCenterForArea(area: string): { lat: number; lon: number } {
  const a = area.toLowerCase();
  if (a.includes("osaka"))   return { lat: 34.6937, lon: 135.5023 };
  if (a.includes("kyoto"))   return { lat: 35.0116, lon: 135.7681 };
  if (a.includes("hiroshima")) return { lat: 34.3853, lon: 132.4553 };
  if (a.includes("nara"))    return { lat: 34.6851, lon: 135.8048 };
  if (a.includes("seluruh") || a.includes("jepang")) return { lat: 36.2048, lon: 138.2529 };
  return { lat: 35.6762, lon: 139.6503 }; // Tokyo default
}


// ─── Sub-components ───────────────────────────────────────────────────────────

function PlaceDetailModalHeader({ title, icon, onClose }: { title: string; icon: string; onClose: () => void }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 border-b border-slate-100 px-4 py-3.5 sm:px-5 sm:py-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-base leading-none" aria-hidden>
        {icon}
      </span>
      <h2 id="place-detail-title" className="min-w-0 flex-1 text-sm font-bold text-slate-900 sm:text-base">
        {title}
      </h2>
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup detail"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

function PlaceDetailHero({ image, regionBadge }: { image: string; regionBadge: string }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100 sm:aspect-[16/9]">
      <Image src={image} alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, 600px" priority />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      <span className="absolute bottom-2.5 left-2.5 rounded-md bg-black/55 px-2 py-0.5 text-[0.65rem] font-medium text-white backdrop-blur-[2px] sm:text-xs">
        {regionBadge}
      </span>
    </div>
  );
}

function InfoPills({ categoryLabel }: { categoryLabel: string }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:gap-3">
      <div className="rounded-xl bg-slate-100 px-3 py-2.5 sm:px-3.5 sm:py-3">
        <p className="text-[0.65rem] font-medium text-slate-500 sm:text-xs">Kategori</p>
        <p className="mt-1 text-xs font-bold text-slate-800 sm:text-sm">{categoryLabel}</p>
      </div>
    </div>
  );
}

function SectionTitle({ emoji, children }: { emoji: string; children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-1.5 text-sm font-bold text-slate-900 sm:text-base">
      <span aria-hidden>{emoji}</span>
      {children}
    </h3>
  );
}

function DetailHighlightRow({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-slate-100 px-3 py-2.5 sm:px-3.5 sm:py-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-slate-800 sm:text-sm">{title}</p>
        <p className="mt-0.5 text-[0.7rem] leading-relaxed text-slate-600 sm:text-xs">{subtitle}</p>
      </div>
    </div>
  );
}

const IconPlane = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </svg>
);

const IconPin = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconClock = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

function PlaceDetailFooter({
  priceLabel,
  isFree,
  selected,
  onPrimary,
  hideCartAction = false,
}: {
  priceLabel: string;
  isFree: boolean;
  selected: boolean;
  onPrimary: () => void;
  hideCartAction?: boolean;
}) {
  return (
    <div className="shrink-0 border-t border-slate-100 px-4 py-3.5 sm:px-5 sm:py-4">
      <div className={`flex items-center justify-between text-sm sm:text-base ${!hideCartAction ? 'mb-3' : ''}`}>
        <span className="font-semibold text-slate-700">Harga Tiket</span>
        <span className={`font-bold ${isFree ? "text-emerald-600" : "text-slate-900"}`}>
          {priceLabel}
          {!isFree && <span className="ml-1 text-xs font-normal text-slate-500">/orang</span>}
        </span>
      </div>
      
      {!hideCartAction && (
        <button
          type="button"
          onClick={onPrimary}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition-all hover:bg-primary-dark active:scale-[0.99] sm:py-3.5 sm:text-base"
        >
          {selected ? (
            <>
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Hapus dari Cart
            </>
          ) : (
            <>
              <span className="text-lg leading-none">+</span>
              Tambah ke Cart
            </>
          )}
        </button>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function PlaceDetailModal({ 
  place, 
  categoryLabel, 
  categoryIcon, 
  onClose, 
  onToggleCart,
  hideCartAction = false,
}: PlaceDetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!place) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [place]);

  useEffect(() => {
    if (!place) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [place, onClose]);

  if (!place) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  const lat = place.latitude ?? mapCenterForArea(place.area).lat;
  const lon = place.longitude ?? mapCenterForArea(place.area).lon;
  const hasExactCoords = place.latitude != null && place.longitude != null;
  const regionBadge   = regionBadgeFromArea(place.area);
  const isFree        = place.price === 0;
  const priceLabel    = isFree ? "Gratis" : formatIDR(place.price);

  const handlePrimary = () => {
    onToggleCart?.(place.id);
    onClose();
  };

  // Google Maps embed URL with marker — hl=id for Bahasa Indonesia
  const gmapsEmbedUrl = `https://maps.google.com/maps?q=${lat},${lon}&z=16&hl=id&output=embed`;
  const gmapsExternalUrl = `https://www.google.com/maps?q=${lat},${lon}&hl=id`;

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
        aria-labelledby="place-detail-title"
        className="flex max-h-[100dvh] w-full max-w-[100vw] flex-col rounded-t-2xl bg-white shadow-2xl sm:max-h-[min(90dvh,720px)] sm:max-w-lg sm:rounded-2xl"
      >
        <PlaceDetailModalHeader title={place.title} icon={categoryIcon} onClose={onClose} />

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5 sm:py-5">
          <div className="space-y-4 sm:space-y-5">
            <PlaceDetailHero image={place.image} regionBadge={regionBadge} />
            <InfoPills categoryLabel={categoryLabel} />

            <div className="space-y-2">
              <SectionTitle emoji="✨">Ringkasan Tempat</SectionTitle>
              <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">{place.subtitle}</p>
            </div>

            <div className="space-y-2.5">
              <SectionTitle emoji="⭐">Detail &amp; Keunggulan</SectionTitle>
              <div className="space-y-2">
                <DetailHighlightRow icon={<IconPlane />} title="Jarak &amp; Akses" subtitle="Kurang lebih 15 menit dari stasiun terdekat (estimasi)." />
                <DetailHighlightRow icon={<IconPin />} title="Lokasi" subtitle={place.area} />
                <DetailHighlightRow icon={<IconClock />} title="Estimasi Waktu Kunjungan" subtitle="1–2 jam (tergantung ritme rombongan)." />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900 sm:text-base">📍 Lokasi di Peta</h4>
                {hasExactCoords && (
                  <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[0.6rem] font-semibold text-emerald-600">Lokasi Tepat</span>
                )}
              </div>
              <div className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <iframe
                  title={`Peta ${place.title}`}
                  src={gmapsEmbedUrl}
                  className="h-48 w-full border-0 sm:h-56"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a
                href={gmapsExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-1 text-[0.65rem] text-primary hover:underline sm:text-xs"
              >
                Buka di Google Maps ↗
              </a>
            </div>
          </div>
        </div>

        <PlaceDetailFooter 
          priceLabel={priceLabel} 
          isFree={isFree} 
          selected={place.selected} 
          onPrimary={handlePrimary} 
          hideCartAction={hideCartAction}
        />
      </div>
    </div>
  );
}