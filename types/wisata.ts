export interface Wisata {
  ID: number;
  Kota: string;
  KategoriWisata: string;
  NamaWisata: string;
  TiketWisata: number;
  AlamatWisata: string;
  Latitude: number;
  Longitude: number;
  KetWisata: string;
  Foto: string;
  CreatedAt: string;
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