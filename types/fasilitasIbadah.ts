export interface FasilitasIbadah {
  id: number;
  kota: string;
  tipe_fas: string;
  nama_fas_ibadah: string;
  lokasi_fas_ibadah: string;
  latitude: number;
  longitude: number;
  foto: string;
  created_at: string;
}
 
export interface FasilitasIbadahPayload {
  kota: string;
  tipe_fas: string;
  nama_fas_ibadah: string;
  lokasi_fas_ibadah: string;
  latitude: number;
  longitude: number;
  foto: string;
}