export interface Wisata {
  id: number;
  kota: string;
  kategori_wisata: string;
  nama_wisata: string;
  tiket_wisata: number;
  alamat_wisata: string;
  latitude: number;
  longitude: number;
  ket_wisata: string;
  foto: string;
  created_at: string;
}
 
export interface WisataPayload {
  kota: string;
  kategori_wisata: string;
  nama_wisata: string;
  tiket_wisata: number;
  alamat_wisata: string;
  latitude: number;
  longitude: number;
  ket_wisata: string;
  foto: string;
}