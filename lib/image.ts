type ImageCategory =
  | "hotel"
  | "wisata"
  | "restoran"
  | "transportasi"
  | "fasilitas"
  | "kota"
  | "toko";

const FALLBACK_IMAGE = "/image/placeholder.jpg";

export function getImageUrl(
  filename: string | null | undefined,
  category: ImageCategory = "hotel"
): string {
  if (!filename) return FALLBACK_IMAGE;

  if (filename.startsWith("http://") || filename.startsWith("https://")) {
    return filename;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl) {
    // Return supabase public URL for edutrip-images bucket
    return `${supabaseUrl}/storage/v1/object/public/edutrip-images/${category}/${filename}`;
  }

  return `/image/${category}/${filename}`;
}