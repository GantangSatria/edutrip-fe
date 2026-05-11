"use client";

import { useEffect, useRef } from "react";

import { flightEstimateGroups } from "@/data/flight-estimates";
import type { FlightDestinationEstimate, FlightOriginGroup } from "@/types/flight-estimate";

type FlightPriceModalProps = {
  open: boolean;
  onClose: () => void;
};

function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function FlightPriceModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex shrink-0 items-start gap-2.5 border-b border-slate-100 px-4 py-3.5 sm:px-5 sm:py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100">
        <svg className="h-4 w-4 -rotate-45 text-emerald-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
        </svg>
      </div>
      <div className="min-w-0 flex-1 pr-2">
        <h2 id="flight-price-modal-title" className="text-sm font-bold text-slate-900 sm:text-base">
          Estimasi Harga Pesawat
        </h2>
        <p className="mt-1 text-[0.65rem] leading-relaxed text-slate-500 sm:text-xs">
          Harga estimasi PP (pulang-pergi) per orang dari bandara di Jawa ke Jepang
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-primary text-slate-600 transition-colors hover:bg-emerald-50"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

function DestinationRow({ row }: { row: FlightDestinationEstimate }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-slate-100 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-3.5 sm:py-3">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-slate-900 sm:text-sm">
          {row.airportName} ({row.airportCode})
        </p>
        <p className="mt-0.5 text-[0.65rem] text-slate-500 sm:text-xs">{row.airlines}</p>
      </div>
      <p className="shrink-0 text-right text-xs font-bold text-rose-800 sm:text-sm">{formatIDR(row.priceIdr)}</p>
    </div>
  );
}

function OriginGroupCard({ group }: { group: FlightOriginGroup }) {
  return (
    <div className="rounded-xl bg-slate-100/90 p-3 sm:p-3.5">
      <h3 className="text-xs font-bold text-slate-900 sm:text-sm">{group.originTitle}</h3>
      <div className="mt-2.5 space-y-2 sm:mt-3">
        {group.destinations.map((row) => (
          <DestinationRow key={`${group.originTitle}-${row.airportCode}`} row={row} />
        ))}
      </div>
    </div>
  );
}

export function FlightPriceModal({ open, onClose }: FlightPriceModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="flight-price-modal-title"
        className="flex max-h-[100dvh] w-full max-w-[100vw] flex-col rounded-t-2xl bg-white shadow-2xl sm:max-h-[min(90dvh,720px)] sm:max-w-xl sm:rounded-2xl"
      >
        <FlightPriceModalHeader onClose={onClose} />

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5 sm:py-5">
          <div className="space-y-3 sm:space-y-4">
            {flightEstimateGroups.map((group) => (
              <OriginGroupCard key={group.originTitle} group={group} />
            ))}
          </div>
          <p className="mt-4 text-center text-[0.65rem] leading-relaxed text-slate-400 sm:text-xs">
            Angka bersifat estimasi dan dapat berubah mengikuti musim, maskapai, serta ketersediaan tiket.
          </p>
        </div>
      </div>
    </div>
  );
}
