export interface Transportasi {
  ID: number;
  JenisTransportasi: string;
  NamaTransportasi: string;
  Rute: string;
  KodeBandara: string;
  HargaTransportasiIdr: number;
  KetTransportasi: string;
  Foto: string;
  CreatedAt: string;
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