"use client";

import { useEffect, useRef, useState } from "react";

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
      "Sistem hanya memberikan perhitungan dan tidak menggangtikan layanan keamanan; tanggung jawab perjalanan.",
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

  // Reset checkbox whenever modal reopens
  // useEffect(() => {
  //   if (open) setAgreed(false);
  // }, [open]);

  // Lock body scroll while open
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

  // Close on Escape
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

        {/* Scrollable body */}
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
                      <span className="mt-px shrink-0 font-medium text-slate-400">
                        {i + 1}.
                      </span>
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
              Saya telah membaca dan menyetujui syarat &amp; Ketentuan di
              atas.
            </span>
          </label>

          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => {
                setAgreed(false);
                onClose();
              }}
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
