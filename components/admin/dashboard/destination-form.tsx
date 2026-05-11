"use client";

import { FormEvent, useState } from "react";

export type DestinationFormData = {
  id?: string;
  nama: string;
  kota: string;
  kategori: string;
  harga: string;
  deskripsi: string;
  khususan: string;
  jalurAkses: string;
};

type DestinationFormProps = {
  mode: "create" | "edit" | "view";
  initialData?: DestinationFormData;
  onSubmit: (data: DestinationFormData) => Promise<void>;
  onCancel: () => void;
};

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:py-3 sm:text-base disabled:bg-slate-50 disabled:text-slate-500";

const selectClass = inputClass;

const textareaClass =
  "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:py-3 sm:text-base disabled:bg-slate-50 disabled:text-slate-500 resize-none";

const labelClass = "text-sm font-semibold text-slate-700 sm:text-base";

export function DestinationForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: DestinationFormProps) {
  const [formData, setFormData] = useState<DestinationFormData>(
    initialData || {
      nama: "",
      kota: "",
      kategori: "",
      harga: "",
      deskripsi: "",
      khususan: "",
      jalurAkses: "",
    }
  );

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nama.trim()) newErrors.nama = "Nama wajib diisi";
    if (!formData.kota.trim()) newErrors.kota = "Kota wajib dipilih";
    if (!formData.kategori.trim()) newErrors.kategori = "Kategori wajib dipilih";
    if (!formData.harga.trim()) newErrors.harga = "Harga wajib diisi";
    if (!formData.deskripsi.trim()) newErrors.deskripsi = "Deskripsi wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof DestinationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      {/* Row 1: Nama dan Kota */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <div>
          <label className={labelClass}>Nama Destinasi</label>
          <input
            type="text"
            className={inputClass}
            placeholder="Masukkan nama destinasi"
            value={formData.nama}
            onChange={(e) => handleChange("nama", e.target.value)}
            disabled={loading || mode === "view"}
          />
          {errors.nama && <p className="mt-1.5 text-xs text-rose-600 sm:text-sm">{errors.nama}</p>}
        </div>

        <div>
          <label className={labelClass}>Kota</label>
          <select
            className={selectClass}
            value={formData.kota}
            onChange={(e) => handleChange("kota", e.target.value)}
            disabled={loading || mode === "view"}
          >
            <option value="">Pilih Kota</option>
            <option value="Tokyo">Tokyo</option>
            <option value="Osaka">Osaka</option>
            <option value="Kyoto">Kyoto</option>
            <option value="Hiroshima">Hiroshima</option>
            <option value="Nara">Nara</option>
          </select>
          {errors.kota && <p className="mt-1.5 text-xs text-rose-600 sm:text-sm">{errors.kota}</p>}
        </div>
      </div>

      {/* Row 2: Kategori dan Harga */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <div>
          <label className={labelClass}>Kategori</label>
          <select
            className={selectClass}
            value={formData.kategori}
            onChange={(e) => handleChange("kategori", e.target.value)}
            disabled={loading || mode === "view"}
          >
            <option value="">Pilih Kategori</option>
            <option value="Universitas">Universitas</option>
            <option value="Tempat Wisata">Tempat Wisata</option>
            <option value="Kuliner">Kuliner</option>
            <option value="Hotel">Hotel</option>
            <option value="Transport">Transport</option>
          </select>
          {errors.kategori && <p className="mt-1.5 text-xs text-rose-600 sm:text-sm">{errors.kategori}</p>}
        </div>

        <div>
          <label className={labelClass}>Harga (USD)</label>
          <input
            type="number"
            className={inputClass}
            placeholder="0"
            min="0"
            step="0.01"
            value={formData.harga}
            onChange={(e) => handleChange("harga", e.target.value)}
            disabled={loading || mode === "view"}
          />
          {errors.harga && <p className="mt-1.5 text-xs text-rose-600 sm:text-sm">{errors.harga}</p>}
        </div>
      </div>

      {/* Row 3: Deskripsi */}
      <div>
        <label className={labelClass}>Deskripsi</label>
        <textarea
          className={textareaClass}
          placeholder="Jelaskan detail destinasi..."
          rows={4}
          value={formData.deskripsi}
          onChange={(e) => handleChange("deskripsi", e.target.value)}
          disabled={loading || mode === "view"}
        />
        {errors.deskripsi && <p className="mt-1.5 text-xs text-rose-600 sm:text-sm">{errors.deskripsi}</p>}
      </div>

      {/* Row 4: Khususan dan Jalur Akses */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <div>
          <label className={labelClass}>Khususan / Fitur</label>
          <input
            type="text"
            className={inputClass}
            placeholder="Misalnya: Halal, WiFi, AC"
            value={formData.khususan}
            onChange={(e) => handleChange("khususan", e.target.value)}
            disabled={loading || mode === "view"}
          />
        </div>

        <div>
          <label className={labelClass}>Jalur / Akses</label>
          <input
            type="text"
            className={inputClass}
            placeholder="Misalnya: Stasiun JR +5km"
            value={formData.jalurAkses}
            onChange={(e) => handleChange("jalurAkses", e.target.value)}
            disabled={loading || mode === "view"}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end sm:pt-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-95 disabled:opacity-60 sm:px-5 sm:py-3 sm:text-base"
        >
          {mode === "view" ? "Tutup" : "Batal"}
        </button>
        {mode !== "view" && (
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark active:scale-95 disabled:opacity-60 sm:px-5 sm:py-3 sm:text-base"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="60" strokeOpacity="0.3" />
                  <circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="15" />
                </svg>
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                <span>{mode === "create" ? "Tambah Destinasi" : "Simpan Perubahan"}</span>
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}
