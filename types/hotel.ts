export interface Hotel {
  ID: number;
  Kota: string;
  NamaHotel: string;
  TipeHotel: "Reguler" | "Deluxe" | "VIP" | string;
  HargaHotel: number;
  AlamatHotel: string;
  Latitude: number;
  Longitude: number;
  KetHotel: string;
  Foto: string;
  CreatedAt: string;
}
 
export interface HotelPayload {
  kota: string;
  nama_hotel: string;
  tipe_hotel: string;
  harga_hotel: number;
  alamat_hotel: string;
  latitude: number;
  longitude: number;
  ket_hotel: string;
  foto: string;
}