"use client";

import { FormEvent, useState, useMemo } from "react";
import { useFetch } from "@/hooks/useFetch";
import { kotaService } from "@/lib/service";

// ─── Entity type definitions ─────────────────────────────────────────────────

export type EntityTab = "wisata" | "hotel" | "restoran" | "toko" | "fasilitas" | "transportasi" | "kota";

export type EntityFormData = Record<string, string>;

type FieldDef = {
  key: string;
  label: string;
  type: "text" | "number" | "textarea" | "select" | "file" | "combobox";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  half?: boolean; // render in 2-col grid
};

// ─── Field definitions per entity ────────────────────────────────────────────

const cityOptions = [
  { value: "Tokyo", label: "Tokyo" },
  { value: "Osaka", label: "Osaka" },
  { value: "Kyoto", label: "Kyoto" },
];

const fieldsByEntity: Record<EntityTab, FieldDef[]> = {
  wisata: [
    { key: "nama_wisata", label: "Nama Wisata", type: "text", placeholder: "Nama tempat wisata", required: true, half: true },
    { key: "kota", label: "Kota", type: "combobox", options: cityOptions, placeholder: "Ketik atau pilih kota", required: true, half: true },
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
    { key: "foto", label: "Foto", type: "file" },
  ],
  hotel: [
    { key: "nama_hotel", label: "Nama Hotel", type: "text", placeholder: "Nama hotel", required: true, half: true },
    { key: "kota", label: "Kota", type: "combobox", options: cityOptions, placeholder: "Ketik atau pilih kota", required: true, half: true },
    { key: "tipe_hotel", label: "Tipe Hotel", type: "select", required: true, half: true, options: [
      { value: "", label: "Pilih Tipe" },
      { value: "Reguler", label: "Reguler" },
      { value: "Deluxe", label: "Deluxe" },
      { value: "VIP", label: "VIP" },
    ]},
    { key: "harga_hotel", label: "Harga /kamar /malam (IDR)", type: "number", placeholder: "0", required: true, half: true },
    { key: "alamat_hotel", label: "Alamat", type: "text", placeholder: "Alamat hotel", required: true },
    { key: "latitude", label: "Latitude", type: "number", placeholder: "0.0", required: true, half: true },
    { key: "longitude", label: "Longitude", type: "number", placeholder: "0.0", required: true, half: true },
    { key: "ket_hotel", label: "Keterangan", type: "textarea", placeholder: "Fasilitas dan catatan hotel..." },
    { key: "foto", label: "Foto", type: "file" },
  ],
  restoran: [
    { key: "nama_resto", label: "Nama Restoran", type: "text", placeholder: "Nama restoran", required: true, half: true },
    { key: "kota", label: "Kota", type: "combobox", options: cityOptions, placeholder: "Ketik atau pilih kota", required: true, half: true },
    { key: "alamat_resto", label: "Alamat", type: "text", placeholder: "Alamat restoran", required: true },
    { key: "latitude", label: "Latitude", type: "number", placeholder: "0.0", required: true, half: true },
    { key: "longitude", label: "Longitude", type: "number", placeholder: "0.0", required: true, half: true },
    { key: "harga_resto", label: "Kisaran Harga", type: "text", placeholder: "Rp100.000 - Rp300.000", required: true },
    { key: "ket_resto", label: "Keterangan", type: "textarea", placeholder: "Deskripsi restoran..." },
    { key: "foto", label: "Foto", type: "file" },
  ],
  toko: [
    { key: "nama_belanja", label: "Nama Toko", type: "text", placeholder: "Nama toko oleh-oleh", required: true, half: true },
    { key: "kota", label: "Kota", type: "combobox", options: cityOptions, placeholder: "Ketik atau pilih kota", required: true, half: true },
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
    { key: "foto", label: "Foto", type: "file" },
  ],
  fasilitas: [
    { key: "nama_fas_ibadah", label: "Nama Fasilitas", type: "text", placeholder: "Nama masjid / mushola", required: true, half: true },
    { key: "kota", label: "Kota", type: "combobox", options: cityOptions, placeholder: "Ketik atau pilih kota", required: true, half: true },
    { key: "tipe_fas", label: "Tipe", type: "select", required: true, half: true, options: [
      { value: "", label: "Pilih Tipe" },
      { value: "Masjid", label: "Masjid" },
      { value: "Mushola", label: "Mushola" },
    ]},
    { key: "lokasi_fas_ibadah", label: "Lokasi Detail", type: "text", placeholder: "Lantai 3, Gedung A...", required: true, half: true },
    { key: "latitude", label: "Latitude", type: "number", placeholder: "0.0", required: true, half: true },
    { key: "longitude", label: "Longitude", type: "number", placeholder: "0.0", required: true, half: true },
    { key: "foto", label: "Foto", type: "file" },
  ],
  transportasi: [
    { key: "nama_transportasi", label: "Nama Transportasi", type: "text", placeholder: "Nama transportasi", required: true, half: true },
    { key: "jenis_transportasi", label: "Jenis", type: "select", required: true, half: true, options: [
      { value: "Pesawat", label: "Pesawat" },
      { value: "Kereta Cepat", label: "Kereta Cepat" },
      { value: "Kereta Lokal", label: "Kereta Lokal" },
      { value: "Bus", label: "Bus" },
      { value: "Sewa Mobil", label: "Sewa Mobil" },
    ]},
    { key: "rute", label: "Rute", type: "text", placeholder: "Contoh: Tokyo - Osaka", half: true },
    { key: "harga_transportasi", label: "Harga (IDR)", type: "number", placeholder: "0", required: true, half: true },
    { key: "ket_transportasi", label: "Keterangan", type: "text", placeholder: "Termasuk bagasi, dll..." },
  ],
  kota: [
    { key: "name", label: "Nama Kota", type: "text", placeholder: "Nama kota", required: true, half: true },
    { key: "halal_spots_value", label: "Halal Spots Value", type: "text", placeholder: "150+", half: true },
    { key: "halal_spots_label", label: "Halal Spots Label", type: "text", placeholder: "Tempat Halal", half: true },
    { key: "main_mosque_title", label: "Nama Masjid Utama", type: "text", placeholder: "Tokyo Camii", half: true },
    { key: "main_mosque_subtitle", label: "Subtitle Masjid Utama", type: "text", placeholder: "Masjid terbesar se-Jepang" },
    { key: "features", label: "Features (Koma terpisah)", type: "textarea", placeholder: "Kuil bersejarah, Surga kuliner, Pemandangan alam..." },
    { key: "terrain_lead", label: "Terrain Lead", type: "text", placeholder: "Medan:", half: true },
    { key: "terrain_rest", label: "Terrain Rest", type: "text", placeholder: "Datar, ramah kursi roda.", half: true },
    { key: "description", label: "Deskripsi (Landing Page)", type: "textarea", placeholder: "Deskripsi singkat kota..." },
    { key: "foto", label: "Foto", type: "file" },
  ]
};

// ─── Helpers to convert API response → form data ─────────────────────────────

export function apiItemToFormData(tab: EntityTab, raw: Record<string, unknown>): EntityFormData {
  if (!raw) return {};

  // Since API response and form fields now both use snake_case,
  // we just need to convert all values to strings for the form.
  const fields = fieldsByEntity[tab] || [];
  const result: EntityFormData = {};

  for (const field of fields) {
    let val = raw[field.key];
    
    // For 'kota', handle specific fields
    if (tab === "kota") {
      if (field.key === "foto") {
        val = raw["image"];
      } else if (field.key === "features" && typeof val === "string") {
        try {
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed)) {
            val = parsed
              .map((item) => (typeof item === "object" && item !== null ? item.text || "" : String(item)))
              .filter(Boolean)
              .join(", ");
          }
        } catch (e) {
          // Not valid JSON, leave as raw string
        }
      }
    }

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
    kota: [],
  };

  for (const key of numericKeys[tab] || []) {
    if (payload[key] !== undefined) {
      payload[key] = Number(payload[key]) || 0;
    }
  }

  if (tab === "kota") {
    // Map foto to image for API
    if (payload.foto) {
      payload.image = payload.foto;
      delete payload.foto;
    }
    // Parse features from comma-separated string to a stringified JSON array
    // so it satisfies the Go `string` struct and the Postgres `JSONB` column.
    if (typeof payload.features === "string") {
      const arr = (payload.features as string).split(",").map(s => s.trim()).filter(s => s);
      payload.features = JSON.stringify(arr);
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

  const { data: rawCities } = useFetch(() => kotaService.getAll(), []);
  
  const dynamicCityOptions = useMemo(() => {
    return (rawCities || []).map((city) => ({
      value: city.name,
      label: city.name,
    }));
  }, [rawCities]);

  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    for (const f of fields) {
      const val = formData[f.key];
      const strVal = (val ?? "").toString().trim();

      // If mode is create and file is required, check if file is selected
      if (f.type === "file" && f.required && !fileToUpload && !strVal) {
        newErrors[f.key] = `${f.label} wajib diupload`;
        continue;
      } else if (f.type !== "file" && f.required && !strVal) {
        newErrors[f.key] = `${f.label} wajib diisi`;
        continue;
      }

      if (!strVal) continue;

      // Harga & Tiket validation
      if (f.key.toLowerCase().includes("harga") || f.key.toLowerCase().includes("tiket")) {
        const numVal = Number(strVal);
        if (isNaN(numVal)) {
          newErrors[f.key] = `${f.label} harus berupa angka`;
        } else if (numVal < 0) {
          newErrors[f.key] = `${f.label} tidak boleh negatif`;
        } else if (strVal.length > 10) {
          newErrors[f.key] = `${f.label} maksimal 10 digit`;
        }
      }

      // Latitude validation
      if (f.key.toLowerCase().includes("latitude")) {
        const numVal = Number(strVal);
        if (isNaN(numVal) || numVal < -90 || numVal > 90) {
          newErrors[f.key] = "Latitude harus berupa angka antara -90 dan 90";
        }
      }

      // Longitude validation
      if (f.key.toLowerCase().includes("longitude")) {
        const numVal = Number(strVal);
        if (isNaN(numVal) || numVal < -180 || numVal > 180) {
          newErrors[f.key] = "Longitude harus berupa angka antara -180 dan 180";
        }
      }

      // Kode Bandara validation
      if (f.key.toLowerCase().includes("kode_bandara")) {
        if (strVal.length > 4) {
          newErrors[f.key] = "Kode bandara maksimal 4 karakter";
        } else if (!/^[A-Z]+$/.test(strVal)) {
          newErrors[f.key] = "Kode bandara hanya boleh berisi huruf kapital";
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileToUpload(e.target.files[0]);
      if (errors["foto"]) setErrors((prev) => ({ ...prev, foto: "" }));
    }
  };

  const uploadFileToSupabase = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    // Map entityTab to bucket folder name. We use the entityTab name except for some matches
    // tab values: "wisata" | "hotel" | "restoran" | "toko" | "fasilitas" | "transportasi"
    const filePath = `${entityTab}/${fileName}`;

    // Dynamic import to avoid SSR issues if any, but since it's "use client", regular import is fine.
    // We'll import supabase dynamically inside the function to keep the component simple.
    const { supabase } = await import("@/lib/supabase");

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
       console.warn("Supabase URL not set, skipping upload logic");
       return file.name;
    }

    const { error } = await supabase.storage
      .from("edutrip-images")
      .upload(filePath, file);

    if (error) {
      throw new Error(`Upload gagal: ${error.message}`);
    }

    // Return just the filename since getImageUrl handles the rest
    return fileName;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const finalData = { ...formData };
      
      // Handle file upload
      if (fileToUpload) {
        const uploadedFilename = await uploadFileToSupabase(fileToUpload);
        finalData["foto"] = uploadedFilename;

        // If in edit mode and there was an old photo, delete it to prevent orphaned files
        if (mode === "edit" && initialData?.foto && initialData.foto !== uploadedFilename) {
          try {
            const { deleteImageFromSupabase } = await import("@/lib/supabase");
            await deleteImageFromSupabase(entityTab, initialData.foto);
          } catch (e) {
            console.warn("Failed to delete old image:", e);
          }
        }
      }

      await onSubmit(finalData);
    } catch (error) {
       alert(error instanceof Error ? error.message : "Terjadi kesalahan saat upload");
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

              {(() => {
                const isTransportasiLocked = entityTab === "transportasi" && 
                  mode === "edit" && 
                  (field.key === "kode_bandara" || field.key === "rute" || field.key === "jenis_transportasi");
                
                const isFieldDisabled = loading || mode === "view" || isTransportasiLocked;

                if (field.type === "select") {
                  return (
                    <select
                      className={inputClass}
                      value={formData[field.key] ?? ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      disabled={isFieldDisabled}
                    >
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  );
                } else if (field.type === "textarea") {
                  return (
                    <textarea
                      className={textareaClass}
                      placeholder={field.placeholder}
                      rows={3}
                      value={formData[field.key] ?? ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      disabled={isFieldDisabled}
                    />
                  );
                } else if (field.type === "file") {
                  return (
                    <div className="flex flex-col gap-2">
                       <input
                         type="file"
                         accept="image/*"
                         className={`${inputClass} !py-2`}
                         onChange={handleFileChange}
                         disabled={isFieldDisabled}
                       />
                       {formData[field.key] && !fileToUpload && (
                         <p className="text-xs text-slate-500">File saat ini: {formData[field.key]}</p>
                       )}
                    </div>
                  );
                } else if (field.type === "combobox") {
                  const listId = `${field.key}-datalist`;
                  const options = field.key === "kota" && dynamicCityOptions.length > 0 
                    ? dynamicCityOptions 
                    : field.options || [];

                  return (
                    <>
                      <input
                        type="text"
                        list={listId}
                        className={inputClass}
                        placeholder={field.placeholder}
                        value={formData[field.key] ?? ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        disabled={isFieldDisabled}
                        autoComplete="off"
                      />
                      <datalist id={listId}>
                        {options.map((opt) => (
                          <option key={opt.value} value={opt.value} />
                        ))}
                      </datalist>
                    </>
                  );
                } else {
                  return (
                    <input
                      type={field.type}
                      className={inputClass}
                      placeholder={field.placeholder}
                      step={field.type === "number" ? "any" : undefined}
                      value={formData[field.key] ?? ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      disabled={isFieldDisabled}
                    />
                  );
                }
              })()}

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
