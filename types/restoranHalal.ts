export interface RestoranHalal {
  id: number;
  nama_resto: string;
  kota: string;
  alamat_resto: string;
  latitude: number;
  longitude: number;
  ket_resto: string;
  harga_resto: string;
  foto: string;
  created_at: string;
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