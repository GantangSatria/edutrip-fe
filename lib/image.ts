type ImageCategory =
  | "hotel"
  | "wisata"
  | "restoran"
  | "transportasi"
  | "fasilitas"
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

  return `/image/${category}/${filename}`;
}