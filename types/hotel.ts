export interface Hotel {
  id: number;
  kota: string;
  nama_hotel: string;
  tipe_hotel: "Reguler" | "Deluxe" | "VIP" | string;
  harga_hotel: number;
  alamat_hotel: string;
  latitude: number;
  longitude: number;
  ket_hotel: string;
  foto: string;
  created_at: string;
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