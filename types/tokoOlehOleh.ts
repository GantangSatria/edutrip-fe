export interface TokoOlehOleh {
  id: number;
  kota: string;
  nama_belanja: string;
  jenis_belanja: string;
  ket_belanja: string;
  alamat_belanja: string;
  latitude: number;
  longitude: number;
  foto: string;
  created_at: string;
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