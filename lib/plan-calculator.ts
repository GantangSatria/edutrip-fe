const WA_ADMIN_NUMBER = "962795635222";

// Formatter 

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

//  GRAND TOTAL = Penginapan + Transportasi + Tiket Destinasi + Restoran + Pesawat PP
//
//  Penginapan      = hotelRatePerNight  × (days − 1) × ceil(people / 2)  ← per KAMAR, maks 2 orang
//  Transportasi    = transportRatePerDay × days       × people
//  Tiket Destinasi = totalDestinationTickets          × people  (sudah dijumlah)
//  Restoran        = restaurantCount × avgMealRate    × people
//  Pesawat PP      = flightPricePerPerson × 2           × people

export type GrandTotalInput = {
  people: number;
  days: number;
  hotelRatePerNight: number;
  transportRatePerDay: number;
  //Jumlah harga tiket semua destinasi yang dipilih — belum × people
  totalDestinationTickets: number;
  restaurantCount: number;
  avgMealRate: number;
  /** Harga tiket pesawat SEKALI JALAN per orang — akan di-×2 (PP) oleh calculator */
  flightPricePerPerson: number;
  hasSelectedHotel?: boolean;
};

export type GrandTotalResult = {
  akomodasi: number;
  rooms: number;
  transportasi: number;
  destinasi: number;
  restoran: number;
  pesawat: number;
  grandTotal: number;
};

export function calculateGrandTotal(input: GrandTotalInput): GrandTotalResult {
  const {
    people,
    days,
    hotelRatePerNight,
    transportRatePerDay,
    totalDestinationTickets,
    restaurantCount,
    avgMealRate,
    flightPricePerPerson,
  } = input;

  const nights = Math.max(input.hasSelectedHotel ? 1 : 0, days - 1);
  const rooms  = Math.ceil(people / 2); // maks 2 orang per kamar

  const akomodasi    = hotelRatePerNight       * nights          * rooms;
  const transportasi = transportRatePerDay     * days            * people;
  const destinasi    = totalDestinationTickets                   * people;
  const restoran     = restaurantCount         * avgMealRate     * people;
  const pesawat      = flightPricePerPerson * 2                  * people;

  const grandTotal = akomodasi + transportasi + destinasi + restoran + pesawat;

  return { akomodasi, rooms, transportasi, destinasi, restoran, pesawat, grandTotal };
}

// WhatsApp URL Builder

export type WaMessageInput = {
  cities: string[];
  departureDate: string;
  days: number;
  people: number;
  destinations: string[];
  restaurants: string[];
  grandTotal: number;
  hasSelectedHotel?: boolean;
};

export function buildWhatsAppUrl(input: WaMessageInput): string {
  const { cities, departureDate, days, people, destinations, restaurants, grandTotal } = input;

  const nights    = Math.max(input.hasSelectedHotel ? 1 : 0, days - 1);
  const cityLabel = cities.length > 0 ? cities.join(", ") : "-";

  const destinationLines =
    destinations.length > 0
      ? destinations.map((d) => `   - ${d}`).join("\n")
      : "   - (belum dipilih)";

  const restaurantLines =
    restaurants.length > 0
      ? restaurants.map((r) => `   - ${r}`).join("\n")
      : "   - (belum dipilih)";

  const message = [
  "Halo Admin Zaid Tour,",
  "Saya tertarik untuk konsultasi rencana perjalanan EduTrip Jepang.",
  "Berikut rincian dari kalkulator website:",
  "",
  `- Kota Tujuan: ${cityLabel}`,
  `- Rencana Keberangkatan: ${departureDate}`,
  `- Durasi: ${days} Hari ${nights} Malam`,
  `- Jumlah Peserta: ${people} Orang (${Math.ceil(people / 2)} kamar, maks 2 org/kamar)`,
  `- Destinasi Pilihan:`,
  destinationLines,
  `- Restoran Pilihan (Wishlist):`,
  restaurantLines,
  "",
  `- Estimasi Biaya Total: *${formatIDR(grandTotal)}*`,
  "",
  "Saya telah membaca dan menyetujui Syarat & Ketentuan layanan.",
  "Mohon informasi lebih lanjut mengenai paket. Terima kasih!",
  ].join("\n");

  return `https://wa.me/${WA_ADMIN_NUMBER}?text=${encodeURIComponent(message)}`;
}