"use client";

import { useEffect, useRef, useState } from "react";
import { useJpyRate } from "@/hooks/useJpyRate";

// ─── Constants ────────────────────────────────────────────────────────────────

const WA_ADMIN_NUMBER = "962795635222";

// ─── Formatter ────────────────────────────────────────────────────────────────

function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatJPY(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── Grand Total Calculator ───────────────────────────────────────────────────
//
//  GRAND TOTAL = Biaya Penginapan + Biaya Transportasi + Biaya Tiket Destinasi
//              + Biaya Restoran + Biaya Tiket Pesawat PP
//
//  Biaya Penginapan      = hotelRatePerNight × (days - 1) × ceil(people / 2) ← per KAMAR, maks 2 orang
//  Biaya Transportasi    = transportRatePerDay × days × people
//  Biaya Tiket Destinasi = Σ ticketPrice (checked destinations) × people
//  Biaya Restoran        = restaurantCount × avgMealRate × people
//  Biaya Pesawat PP      = flightPricePerPerson × people

export type GrandTotalInput = {
  people: number;
  days: number;
  /** Harga hotel per malam (IDR) */
  hotelRatePerNight: number;
  /** Harga transportasi harian per orang (IDR) */
  transportRatePerDay: number;
  /** Total tiket destinasi yang dipilih — sudah dijumlahkan, bukan per orang (IDR) */
  totalDestinationTickets: number;
  /** Jumlah restoran yang dipilih */
  restaurantCount: number;
  /** Rata-rata harga per makan per restoran (IDR) */
  avgMealRate: number;
  /** Harga tiket pesawat PP per orang (IDR) */
  flightPricePerPerson: number;
};

export function calculateGrandTotal(input: GrandTotalInput): {
  akomodasi: number;
  rooms: number;
  transportasi: number;
  destinasi: number;
  restoran: number;
  pesawat: number;
  grandTotal: number;
} {
  const {
    people,
    days,
    hotelRatePerNight,
    transportRatePerDay,
    totalDestinationTickets,
    restaurantCount,
    avgMealRate,
    flightPricePerPerson,
  } = input;

  const nights = Math.max(0, days - 1);
  const rooms = Math.ceil(people / 2); // maks 2 orang per kamar

  const akomodasi = hotelRatePerNight * nights * rooms;
  const transportasi = transportRatePerDay * days * people;
  const destinasi = totalDestinationTickets * people;
  const restoran = restaurantCount * avgMealRate * people;
  const pesawat = flightPricePerPerson * people;

  const grandTotal = akomodasi + transportasi + destinasi + restoran + pesawat;

  return { akomodasi, rooms, transportasi, destinasi, restoran, pesawat, grandTotal };
}

// ─── WhatsApp URL Builder ─────────────────────────────────────────────────────

export type WaMessageInput = {
  cities: string[];
  departureDate: string; // e.g. "15 Juli 2025"
  days: number;
  people: number;
  destinations: string[];
  restaurants: string[];
  grandTotal: number;
};

export function buildWhatsAppUrl(input: WaMessageInput): string {
  const {
    cities,
    departureDate,
    days,
    people,
    destinations,
    restaurants,
    grandTotal,
  } = input;

  const nights = Math.max(0, days - 1);
  const cityLabel = cities.length > 0 ? cities.join(", ") : "-";

  const destinationLines =
    destinations.length > 0
      ? destinations.map((d) => `   - ${d}`).join("\n")
      : "   - (belum dipilih)";

  const restaurantLines =
    restaurants.length > 0
      ? restaurants.map((r) => `   - ${r}`).join("\n")
      : "   - (belum dipilih)";

  const message = [
    "Halo Admin Zaid Tour,",
    "Saya tertarik untuk konsultasi rencana perjalanan EduTrip Jepang.",
    "Berikut rincian dari kalkulator website:",
    "",
    `- Kota Tujuan: ${cityLabel}`,
    `- Rencana Keberangkatan: ${departureDate}`,
    `- Durasi: ${days} Hari ${nights} Malam`,
    `- Jumlah Peserta: ${people} Orang (${Math.ceil(people / 2)} kamar, maks 2 org/kamar)`,
    `- Destinasi Pilihan:`,
    destinationLines,
    `- Restoran Pilihan (Wishlist):`,
    restaurantLines,
    "",
    `- Estimasi Biaya Total: *${formatIDR(grandTotal)}*`,
    "",
    "Saya telah membaca dan menyetujui Syarat & Ketentuan layanan.",
    "Mohon informasi lebih lanjut mengenai paket. Terima kasih!",
  ].join("\n");

  return `https://wa.me/${WA_ADMIN_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ─── Terms Modal ──────────────────────────────────────────────────────────────

type TermsModalProps = {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
};

const TERMS = [
  {
    title: "A. Ketentuan Penggunaan Sistem",
    items: [
      "Pengguna wajib mengisi data dengan benar meliputi: distrik rini, jumlah peserta, kota tujuan, dan pilihan destinasi.",
      "Hasil estimasi biaya yang ditampilkan merupakan perkiraan berdasarkan data yang tersedia; bukan harga final.",
      "Sistem hanya memberikan perhitungan dan tidak menggantikan layanan keamanan; tanggung jawab perjalanan.",
      "Hasil di-sistem akan disampaikan melalui WhatsApp untuk proses lanjutan hingga transaksi.",
    ],
  },
  {
    title: "B. Ketentuan Data dan Akurasi Informasi",
    items: [
      "Kesalahan input oleh pengguna akan mempengaruhi hasil estimasi dan menjadi tanggung jawab pengguna.",
      "Harga dapat berubah sewaktu-waktu sesuai perubahan harga aktual di lapangan.",
      "Sistem tidak menjamin layanan informasi melalui pihak ketiga, yakni WhatsApp.",
    ],
  },
];

export function TermsModal({ open, onClose, onAccept }: TermsModalProps) {
  const [agreed, setAgreed] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
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

  const handleAccept = () => {
    if (!agreed) return;
    onAccept();
    setAgreed(false);
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
    >
      <div className="flex max-h-[92dvh] w-full flex-col rounded-t-2xl bg-white shadow-2xl sm:max-h-[85vh] sm:max-w-lg sm:rounded-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center gap-2.5 border-b border-slate-100 px-4 py-3.5 sm:px-5 sm:py-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100">
            <svg
              className="h-4 w-4 text-emerald-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <h2 className="flex-1 text-sm font-bold text-slate-800 sm:text-base">
            Terms &amp; Conditions
          </h2>
          <button
            type="button"
            onClick={() => {
              setAgreed(false);
              onClose();
            }}
            aria-label="Tutup"
            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
          <p className="mb-4 text-xs leading-relaxed text-slate-500 sm:text-sm">
            Layanan yang disediakan oleh EduTrip Halal Jepun Web oleh tim
            pengembang untuk Zaid Tour memiliki syarat dan ketentuan sebagai
            berikut:
          </p>
          <div className="space-y-4">
            {TERMS.map((section) => (
              <div key={section.title}>
                <h3 className="mb-1.5 text-xs font-semibold text-slate-700 sm:text-sm">
                  {section.title}
                </h3>
                <ol className="list-none space-y-1.5">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex gap-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      <span className="mt-px shrink-0 font-medium text-slate-400">{i + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-100 px-4 py-3.5 sm:px-5 sm:py-4">
          <label className="mb-3 flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-emerald-500"
            />
            <span className="text-xs leading-relaxed text-slate-600 sm:text-sm">
              Saya telah membaca dan menyetujui syarat &amp; Ketentuan di atas.
            </span>
          </label>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => { setAgreed(false); onClose(); }}
              className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-medium text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98] sm:text-sm"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleAccept}
              disabled={!agreed}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2.5 text-xs font-semibold text-white shadow-sm shadow-emerald-500/30 transition-all hover:bg-emerald-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Setuju
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Plan Summary Bar ─────────────────────────────────────────────────────────

type PlanSummaryBarProps = {
  selectedCount: number;
  /** Grand total sudah dihitung di parent, tinggal display (IDR) */
  grandTotal: number;
  people: number;
  cities: string[];
  /** True when airports are not selected — blocks consult */
  disableConsult?: boolean;
  onOpenCart: () => void;
  onConsult: () => void;
};

export function PlanSummaryBar({
  selectedCount,
  grandTotal,
  people,
  cities,
  disableConsult = false,
  onOpenCart,
  onConsult,
}: PlanSummaryBarProps) {
  const cityLabel = cities.length > 0 ? cities.join(" & ") : "Belum dipilih";
  
  const jpyRate = useJpyRate();

  if (selectedCount === 0) return null;

  return (
    <div className="sticky bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.6rem] font-bold text-white">
              {selectedCount}
            </span>
            <p className="truncate text-[0.65rem] text-slate-500 sm:text-xs">
              {cityLabel} · {people} orang · Estimasi total
            </p>
          </div>
          <div className="mt-0.5 flex flex-wrap items-baseline gap-2">
            <p className="text-base font-bold text-rose-600 sm:text-lg lg:text-xl">
              {formatIDR(grandTotal)}
            </p>
            {jpyRate && (
              <p className="text-xs font-medium text-slate-500 sm:text-sm">
                (~ {formatJPY(grandTotal / jpyRate)})
              </p>
            )}
          </div>
          {disableConsult && (
            <p className="mt-0.5 text-[0.6rem] text-amber-600 sm:text-xs">
              ✈ Pilih bandara keberangkatan & tujuan untuk melanjutkan
            </p>
          )}
        </div>

        {/* Right */}
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={onOpenCart}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition-all hover:bg-slate-50 active:scale-95 sm:px-4 sm:text-sm"
            aria-label="Buka keranjang"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span>Cart</span>
          </button>
          <button
            type="button"
            onClick={onConsult}
            disabled={disableConsult}
            title={disableConsult ? "Pilih bandara keberangkatan & tujuan terlebih dahulu" : undefined}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all active:scale-95 sm:px-4 sm:text-sm ${
              disableConsult
                ? "cursor-not-allowed bg-slate-300 shadow-none"
                : "bg-emerald-500 shadow-emerald-500/30 hover:bg-emerald-600"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="hidden sm:inline">Konsultasi</span> WA
          </button>
        </div>
      </div>
    </div>
  );
}