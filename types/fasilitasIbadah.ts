export interface FasilitasIbadah {
  ID: number;
  Kota: string;
  TipeFas: string;
  NamaFasIbadah: string;
  LokasiFasIbadah: string;
  Latitude: number;
  Longitude: number;
  Foto: string;
  CreatedAt: string;
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