export interface Transportasi {
  id: number;
  jenis_transportasi: string;
  nama_transportasi: string;
  rute: string;
  kode_bandara: string;
  harga_transportasi_idr: number;
  ket_transportasi: string;
  foto: string;
  created_at: string;
}
 
export interface TransportasiPayload {
  jenis_transportasi: string;
  nama_transportasi: string;
  rute: string;
  kode_bandara: string;
  harga_transportasi_idr: number;
  ket_transportasi: string;
  foto: string;
}