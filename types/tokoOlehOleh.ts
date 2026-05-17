export interface TokoOlehOleh {
  ID: number;
  Kota: string;
  NamaBelanja: string;
  JenisBelanja: string;
  KetBelanja: string;
  AlamatBelanja: string;
  Latitude: number;
  Longitude: number;
  Foto: string;
  CreatedAt: string;
}
 
export interface TokoOlehOlehPayload {
  kota: string;
  nama_belanja: string;
  jenis_belanja: string;
  ket_belanja: string;
  alamat_belanja: string;
  latitude: number;
  longitude: number;
  foto: string;
}