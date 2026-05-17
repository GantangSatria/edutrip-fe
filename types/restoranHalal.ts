export interface RestoranHalal {
  ID: number;
  NamaResto: string;
  Kota: string;
  AlamatResto: string;
  Latitude: number;
  Longitude: number;
  KetResto: string;
  HargaResto: string;
  Foto: string;
  CreatedAt: string;
}
 
export interface RestoranHalalPayload {
  nama_resto: string;
  kota: string;
  alamat_resto: string;
  latitude: number;
  longitude: number;
  ket_resto: string;
  harga_resto: string;
  foto: string;
}