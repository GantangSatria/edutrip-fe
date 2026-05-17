"use client";

import { FormEvent, useState } from "react";

// ─── Entity type definitions ─────────────────────────────────────────────────

export type EntityTab = "wisata" | "hotel" | "restoran" | "toko" | "fasilitas" | "transportasi";

export type EntityFormData = Record<string, string>;

type FieldDef = {
  key: string;
  label: string;
  type: "text" | "number" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  half?: boolean; // render in 2-col grid
};

// ─── Field definitions per entity ────────────────────────────────────────────

const cityOptions = [
  { value: "", label: "Pilih Kota" },
  { value: "Tokyo", label: "Tokyo" },
  { value: "Osaka", label: "Osaka" },
  { value: "Kyoto", label: "Kyoto" },
];

const fieldsByEntity: Record<EntityTab, FieldDef[]> = {
  wisata: [
    { key: "nama_wisata", label: "Nama Wisata", type: "text", placeholder: "Nama tempat wisata", required: true, half: true },
    { key: "kota", label: "Kota", type: "select", options: cityOptions, required: true, half: true },
    { key: "kategori_wisata", label: "Kategori", type: "select", required: true, half: true, options: [
      { value: "", label: "Pilih Kategori" },
      { value: "Kampus", label: "Kampus" },
      { value: "Museum", label: "Museum" },
      { value: "Taman", label: "Taman" },
      { value: "Taman Hiburan", label: "Taman Hiburan" },
      { value: "Tempat Terkenal", label: "Tempat Terkenal" },
      { value: "Pabrik", label: "Pabrik" },
    ]},
    { key: "tiket_wisata", label: "Harga Tiket (IDR)", type: "number", placeholder: "0", required: true, half: true },
    { key: "alamat_wisata", label: "Alamat", type: "text", placeholder: "Alamat lengkap", required: true },
    { key: "latitude", label: "Latitude", type: "number", placeholder: "0.0", required: true, half: true },
    { key: "longitude", label: "Longitude", type: "number", placeholder: "0.0", required: true, half: true },
    { key: "ket_wisata", label: "Keterangan", type: "textarea", placeholder: "Deskripsi wisata...", required: true },
    { key: "foto", label: "Nama File Foto", type: "text", placeholder: "nama_foto.jpg" },
  ],
  hotel: [
    { key: "nama_hotel", label: "Nama Hotel", type: "text", placeholder: "Nama hotel", required: true, half: true },
    { key: "kota", label: "Kota", type: "select", options: cityOptions, required: true, half: true },
    { key: "tipe_hotel", label: "Tipe Hotel", type: "select", required: true, half: true, options: [
      { value: "", label: "Pilih Tipe" },
      { value: "Reguler", label: "Reguler" },
      { value: "Deluxe", label: "Deluxe" },
      { value: "VIP", label: "VIP" },
    ]},
    { key: "harga_hotel", label: "Harga /malam (IDR)", type: "number", placeholder: "0", required: true, half: true },
    { key: "alamat_hotel", label: "Alamat", type: "text", placeholder: "Alamat hotel", required: true },
    { key: "latitude", label: "Latitude", type: "number", placeholder: "0.0", required: true, half: true },
    { key: "longitude", label: "Longitude", type: "number", placeholder: "0.0", required: true, half: true },
    { key: "ket_hotel", label: "Keterangan", type: "textarea", placeholder: "Fasilitas dan catatan hotel..." },
    { key: "foto", label: "Nama File Foto", type: "text", placeholder: "nama_foto.jpg" },
  ],
  restoran: [
    { key: "nama_resto", label: "Nama Restoran", type: "text", placeholder: "Nama restoran", required: true, half: true },
    { key: "kota", label: "Kota", type: "select", options: cityOptions, required: true, half: true },
    { key: "alamat_resto", label: "Alamat", type: "text", placeholder: "Alamat restoran", required: true },
    { key: "latitude", label: "Latitude", type: "number", placeholder: "0.0", required: true, half: true },
    { key: "longitude", label: "Longitude", type: "number", placeholder: "0.0", required: true, half: true },
    { key: "harga_resto", label: "Kisaran Harga", type: "text", placeholder: "Rp100.000 - Rp300.000", required: true },
    { key: "ket_resto", label: "Keterangan", type: "textarea", placeholder: "Deskripsi restoran..." },
    { key: "foto", label: "Nama File Foto", type: "text", placeholder: "nama_foto.jpg" },
  ],
  toko: [
    { key: "nama_belanja", label: "Nama Toko", type: "text", placeholder: "Nama toko oleh-oleh", required: true, half: true },
    { key: "kota", label: "Kota", type: "select", options: cityOptions, required: true, half: true },
    { key: "jenis_belanja", label: "Jenis", type: "select", required: true, half: true, options: [
      { value: "", label: "Pilih Jenis" },
      { value: "Toko Diskon", label: "Toko Diskon" },
      { value: "Pasar Tradisional", label: "Pasar Tradisional" },
      { value: "Pasar Rakyat", label: "Pasar Rakyat" },
      { value: "Shopping Mall", label: "Shopping Mall" },
      { value: "Underground Mall", label: "Underground Mall" },
      { value: "Fashion & Beauty", label: "Fashion & Beauty" },
    ]},
    { key: "ket_belanja", label: "Keterangan Produk", type: "text", placeholder: "Snack, KitKat, Kipas...", half: true },
    { key: "alamat_belanja", label: "Alamat", type: "text", placeholder: "Alamat toko", required: true },
    { key: "latitude", label: "Latitude", type: "number", placeholder: "0.0", required: true, half: true },
    { key: "longitude", label: "Longitude", type: "number", placeholder: "0.0", required: true, half: true },
    { key: "foto", label: "Nama File Foto", type: "text", placeholder: "nama_foto.jpg" },
  ],
  fasilitas: [
    { key: "nama_fas_ibadah", label: "Nama Fasilitas", type: "text", placeholder: "Nama masjid / mushola", required: true, half: true },
    { key: "kota", label: "Kota", type: "select", options: cityOptions, required: true, half: true },
    { key: "tipe_fas", label: "Tipe", type: "select", required: true, half: true, options: [
      { value: "", label: "Pilih Tipe" },
      { value: "Masjid", label: "Masjid" },
      { value: "Mushola", label: "Mushola" },
    ]},
    { key: "lokasi_fas_ibadah", label: "Lokasi Detail", type: "text", placeholder: "Lantai 3, Gedung A...", required: true, half: true },
    { key: "latitude", label: "Latitude", type: "number", placeholder: "0.0", required: true, half: true },
    { key: "longitude", label: "Longitude", type: "number", placeholder: "0.0", required: true, half: true },
    { key: "foto", label: "Nama File Foto", type: "text", placeholder: "nama_foto.jpg" },
  ],
  transportasi: [
    { key: "nama_transportasi", label: "Nama Transportasi", type: "text", placeholder: "Nama transportasi", required: true, half: true },
    { key: "jenis_transportasi", label: "Jenis", type: "select", required: true, half: true, options: [
      { value: "", label: "Pilih Jenis" },
      { value: "Kereta", label: "Kereta" },
      { value: "Bus", label: "Bus" },
      { value: "Pesawat", label: "Pesawat" },
      { value: "Shinkansen", label: "Shinkansen" },
    ]},
    { key: "rute", label: "Rute", type: "text", placeholder: "Tokyo - Osaka", required: true, half: true },
    { key: "kode_bandara", label: "Kode Bandara", type: "text", placeholder: "NRT", half: true },
    { key: "harga_transportasi_idr", label: "Harga (IDR)", type: "number", placeholder: "0", required: true },
    { key: "ket_transportasi", label: "Keterangan", type: "textarea", placeholder: "Deskripsi transportasi..." },
    { key: "foto", label: "Nama File Foto", type: "text", placeholder: "nama_foto.jpg" },
  ],
};

// ─── Helpers to convert API response → form data ─────────────────────────────

export function apiItemToFormData(tab: EntityTab, raw: Record<string, unknown>): EntityFormData {
  if (!raw) return {};

  // Since API response and form fields now both use snake_case,
  // we just need to convert all values to strings for the form.
  const fields = fieldsByEntity[tab] || [];
  const result: EntityFormData = {};

  for (const field of fields) {
    const val = raw[field.key];
    result[field.key] = val != null ? String(val) : "";
  }

  return result;
}

// Convert form data to API payload (parse numbers)
export function formDataToPayload(tab: EntityTab, data: EntityFormData): Record<string, string | number> {
  const payload: Record<string, string | number> = { ...data };

  // Parse numeric fields
  const numericKeys: Record<EntityTab, string[]> = {
    wisata: ["tiket_wisata", "latitude", "longitude"],
    hotel: ["harga_hotel", "latitude", "longitude"],
    restoran: ["latitude", "longitude"],
    toko: ["latitude", "longitude"],
    fasilitas: ["latitude", "longitude"],
    transportasi: ["harga_transportasi_idr"],
  };

  for (const key of numericKeys[tab] || []) {
    if (payload[key] !== undefined) {
      payload[key] = Number(payload[key]) || 0;
    }
  }

  return payload;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:py-3 sm:text-base disabled:bg-slate-50 disabled:text-slate-500";

const textareaClass =
  "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:py-3 sm:text-base disabled:bg-slate-50 disabled:text-slate-500 resize-none";

const labelClass = "text-sm font-semibold text-slate-700 sm:text-base";

// ─── Component ───────────────────────────────────────────────────────────────

type EntityFormProps = {
  entityTab: EntityTab;
  mode: "create" | "edit" | "view";
  initialData?: EntityFormData;
  onSubmit: (data: EntityFormData) => Promise<void>;
  onCancel: () => void;
};

export function EntityForm({
  entityTab,
  mode,
  initialData,
  onSubmit,
  onCancel,
}: EntityFormProps) {
  const fields = fieldsByEntity[entityTab] || [];

  const defaultData: EntityFormData = {};
  for (const f of fields) defaultData[f.key] = "";

  const [formData, setFormData] = useState<EntityFormData>(initialData || defaultData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    for (const f of fields) {
      if (f.required && !(formData[f.key] ?? "").toString().trim()) {
        newErrors[f.key] = `${f.label} wajib diisi`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
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

  // Group fields into rows: half-width fields are paired
  const rows: FieldDef[][] = [];
  let i = 0;
  while (i < fields.length) {
    if (fields[i].half && i + 1 < fields.length && fields[i + 1].half) {
      rows.push([fields[i], fields[i + 1]]);
      i += 2;
    } else {
      rows.push([fields[i]]);
      i += 1;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className={row.length === 2 ? "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5" : ""}
        >
          {row.map((field) => (
            <div key={field.key}>
              <label className={labelClass}>{field.label}</label>

              {field.type === "select" ? (
                <select
                  className={inputClass}
                  value={formData[field.key] ?? ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  disabled={loading || mode === "view"}
                >
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  className={textareaClass}
                  placeholder={field.placeholder}
                  rows={3}
                  value={formData[field.key] ?? ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  disabled={loading || mode === "view"}
                />
              ) : (
                <input
                  type={field.type}
                  className={inputClass}
                  placeholder={field.placeholder}
                  step={field.type === "number" ? "any" : undefined}
                  value={formData[field.key] ?? ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  disabled={loading || mode === "view"}
                />
              )}

              {errors[field.key] && (
                <p className="mt-1.5 text-xs text-rose-600 sm:text-sm">{errors[field.key]}</p>
              )}
            </div>
          ))}
        </div>
      ))}

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
                <span>{mode === "create" ? "Tambah Data" : "Simpan Perubahan"}</span>
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}
