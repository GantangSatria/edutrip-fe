"use client";

import { useEffect, useMemo, useRef } from "react";

import type { PlanCategory, PlanPlace } from "@/types/plan";

const USD_TO_IDR = 17000;

function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

type CartDetailModalProps = {
  open: boolean;
  onClose: () => void;
  selectedPlaces: PlanPlace[];
  categories: PlanCategory[];
  people: number;
  days: number;
  cityLabel: string;
  onRemoveItem: (id: string) => void;
  onAddMore: () => void;
  onConsultWa: () => void;
};

function CartDetailModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 border-b border-slate-100 px-4 py-3.5 sm:px-5 sm:py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100">
        <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      </div>
      <h2 id="cart-detail-title" className="min-w-0 flex-1 text-sm font-bold text-slate-900 sm:text-base">
        Cart Detail
      </h2>
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup keranjang"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

function CartTripSummaryBar({
  cityLabel,
  days,
  people,
}: {
  cityLabel: string;
  days: number;
  people: number;
}) {
  const nights = Math.max(0, days - 1);
  const durationLabel = `${days} Hari / ${nights} Malam`;

  return (
    <div className="rounded-xl bg-slate-100 px-3 py-2.5 sm:px-4 sm:py-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2">
        <div className="flex items-center gap-1.5 text-[0.7rem] text-slate-700 sm:text-xs">
          <span className="text-emerald-600" aria-hidden>
            <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <span className="font-medium">{cityLabel}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[0.7rem] text-slate-700 sm:text-xs">
          <span className="text-emerald-600" aria-hidden>
            <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
          </span>
          <span className="font-medium">{durationLabel}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[0.7rem] text-slate-700 sm:text-xs">
          <span className="text-emerald-600" aria-hidden>
            <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          <span className="font-medium">{people} Orang</span>
        </div>
      </div>
    </div>
  );
}

function CartSectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-400 sm:text-xs">
      {title} ({count} ITEM)
    </p>
  );
}

function CartLineItem({
  place,
  categoryIcon,
  linePriceLabel,
  isFree,
  onRemove,
}: {
  place: PlanPlace;
  categoryIcon: string;
  linePriceLabel: string;
  isFree: boolean;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 sm:gap-3 sm:px-3.5 sm:py-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-base leading-none" aria-hidden>
        {categoryIcon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-slate-900 sm:text-sm">{place.title}</p>
        <p className="mt-0.5 text-[0.65rem] leading-relaxed text-slate-500 sm:text-xs">{place.subtitle}</p>
      </div>
      <div className="flex shrink-0 items-start gap-1.5 sm:gap-2">
        <p className={`text-right text-xs font-bold sm:text-sm ${isFree ? "text-emerald-600" : "text-rose-600"}`}>
          {linePriceLabel}
        </p>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Hapus ${place.title} dari keranjang`}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function CartTotalRow({ totalLabel }: { totalLabel: string }) {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 pt-3">
      <span className="text-sm font-bold text-slate-900 sm:text-base">Total Estimasi</span>
      <span className="text-base font-bold text-rose-600 sm:text-lg">{totalLabel}</span>
    </div>
  );
}

function CartFooter({
  onAddMore,
  onConsultWa,
}: {
  onAddMore: () => void;
  onConsultWa: () => void;
}) {
  return (
    <div className="shrink-0 border-t border-slate-100 px-4 py-3.5 sm:px-5 sm:py-4">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
        <button
          type="button"
          onClick={onAddMore}
          className="w-full rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-50 active:scale-[0.99] sm:flex-1 sm:py-3"
        >
          Tambah Lagi
        </button>
        <button
          type="button"
          onClick={onConsultWa}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-500/30 transition-all hover:bg-emerald-600 active:scale-[0.99] sm:flex-1 sm:py-3"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.86 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Konsultasi WA
        </button>
      </div>
    </div>
  );
}

function categoryMeta(categories: PlanCategory[], categoryId: string) {
  return categories.find((c) => c.id === categoryId) ?? null;
}

export function CartDetailModal({
  open,
  onClose,
  selectedPlaces,
  categories,
  people,
  days,
  cityLabel,
  onRemoveItem,
  onAddMore,
  onConsultWa,
}: CartDetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(() => {
    const listable = categories.filter((c) => c.id !== "all");
    return listable.map((cat) => ({
      categoryId: cat.id,
      title: cat.label.toUpperCase(),
      places: selectedPlaces.filter((p) => p.categoryId === cat.id),
    }));
  }, [categories, selectedPlaces]);

  const totalUsd = useMemo(
    () => selectedPlaces.reduce((sum, p) => sum + p.price, 0),
    [selectedPlaces]
  );
  const totalIDR = totalUsd * people * USD_TO_IDR;
  const totalLabel = formatIDR(totalIDR);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleAddMore = () => {
    onAddMore();
    onClose();
  };

  const handleConsult = () => {
    onConsultWa();
    onClose();
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
        aria-labelledby="cart-detail-title"
        className="flex max-h-[100dvh] w-full max-w-[100vw] flex-col rounded-t-2xl bg-white shadow-2xl sm:max-h-[min(90dvh,720px)] sm:max-w-lg sm:rounded-2xl"
      >
        <CartDetailModalHeader onClose={onClose} />

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5 sm:py-5">
          <CartTripSummaryBar cityLabel={cityLabel} days={days} people={people} />

          <div className="mt-4 space-y-4 sm:mt-5 sm:space-y-5">
            {selectedPlaces.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
                <p className="text-sm font-medium text-slate-600">Keranjang masih kosong</p>
                <p className="mt-1 text-xs text-slate-400">Pilih destinasi di daftar, lalu tap Tambah.</p>
              </div>
            ) : (
              sections.map((section) => (
                <div key={section.categoryId} className="space-y-2">
                  <CartSectionHeader title={section.title} count={section.places.length} />
                  {section.places.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-2.5 text-center text-[0.7rem] text-slate-400 sm:text-xs">
                      Belum ada item
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {section.places.map((place) => {
                        const meta = categoryMeta(categories, place.categoryId);
                        const icon = meta?.icon ?? "📍";
                        const isFree = place.price === 0;
                        const lineIdr = isFree ? 0 : place.price * people * USD_TO_IDR;
                        const linePriceLabel = isFree ? "Gratis" : formatIDR(lineIdr);
                        return (
                          <CartLineItem
                            key={place.id}
                            place={place}
                            categoryIcon={icon}
                            linePriceLabel={linePriceLabel}
                            isFree={isFree}
                            onRemove={() => onRemoveItem(place.id)}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {selectedPlaces.length > 0 && <CartTotalRow totalLabel={totalLabel} />}
        </div>

        <CartFooter onAddMore={handleAddMore} onConsultWa={handleConsult} />
      </div>
    </div>
  );
}
